import axios from "axios";
import { useAuthStore } from "../store/auth";
import { tokenManager } from "../utils/tokenManager";

const api = axios.create({
  baseURL: "http://localhost:3000/api/v1",
  withCredentials: true,
});

// Store token reference outside of React
let accessToken: string | null = null;
let isRefreshing = false; // Prevent multiple simultaneous refresh calls
let failedQueue: any[] = []; // Queue failed requests during refresh

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve(token);
    }
  });

  failedQueue = [];
};

export const setAccessToken = (token: string | null) => {
  accessToken = token;
  tokenManager.setToken(token);
  console.log("Access token updated:", token ? "Set" : "Cleared");
};

export const getAccessToken = () => accessToken;

// Initialize token from store on module load
export const initializeToken = () => {
  const store = useAuthStore.getState();
  if (store.accessToken) {
    setAccessToken(store.accessToken);
  }
};

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Always try to get the latest token
    const currentToken = accessToken || useAuthStore.getState().accessToken;

    if (currentToken) {
      config.headers.Authorization = `Bearer ${currentToken}`;
      console.log(
        "Request sent with token:",
        currentToken.substring(0, 20) + "..."
      );
    } else {
      console.log("No token available for request");
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor with queue management to prevent multiple refresh calls
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    console.log("API Error:", error.response?.status, error.response?.data);

    // Don't retry refresh-token endpoint to prevent infinite loops
    if (originalRequest.url?.includes("/auth/refresh-token")) {
      console.log("Refresh token request failed");
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // If already refreshing, queue this request
        console.log("Already refreshing, queueing request");
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      console.log("Attempting token refresh...");

      try {
        // Use tokenManager to handle refresh to prevent duplicates
        const newToken = await tokenManager.refreshToken();

        console.log("Token refreshed successfully");

        // Update both memory and store using correct method names
        setAccessToken(newToken);
        useAuthStore.getState().setToken(newToken); // Correct method name

        // Process queued requests
        processQueue(null, newToken);

        // Retry original request
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.log("Token refresh failed:", refreshError);

        // Process queue with error
        processQueue(refreshError, null);

        // Refresh failed - clear everything using correct method names
        setAccessToken(null);
        useAuthStore.getState().clearAuth(); // Correct method name

        // Only redirect if not already on signin page
        if (window.location.pathname !== "/signin") {
          window.location.href = "/signin";
        }

        return Promise.reject(error);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;

export interface ApiOptions {
  page?: number;
  limit?: number;
  search?: string;
  [key: string]: any;
}

export const createApiCall = (endpoint: string) => {
  return async (options?: ApiOptions) => {
    const { page = 1, limit = 10, search = "", ...filters } = options || {};
    const queryParams = new URLSearchParams();

    queryParams.append("page", page.toString());
    queryParams.append("limit", limit.toString());

    if (search) {
      queryParams.append("search", search.toString());
    }

    // Add filter parameters
    Object.entries(filters).forEach(([key, value]) => {
      if (value && value !== "") {
        queryParams.append(key, value.toString());
      }
    });

    const queryString = queryParams.toString();
    const response = await api.get(`${endpoint}?${queryString}`);
    console.log(`API Response for ${endpoint}:`, response.data);
    return response.data;
  };
};

// For endpoints with dynamic parameters
export const createParameterizedApiCall = (endpointTemplate: string) => {
  return (params: Record<string, string>) => {
    let endpoint = endpointTemplate;
    Object.entries(params).forEach(([key, value]) => {
      endpoint = endpoint.replace(`{${key}}`, value);
    });
    return createApiCall(endpoint);
  };
};

import { useEffect, useRef } from "react";
import { useAuthStore } from "../store/auth";
import { tokenManager } from "../utils/tokenManager";
import { setAccessToken } from "../api/api";

export const useAuth = () => {
  const { setToken, clearAuth, setRestoring, restoring, isAuthenticated } =
    useAuthStore();
  const initializeRef = useRef(false);

  // Initialize auth on mount - but only once
  useEffect(() => {
    if (initializeRef.current) return; // Prevent multiple initializations
    initializeRef.current = true;

    let mounted = true;

    const initAuth = async () => {
      console.log("useAuth: Initializing authentication");

      try {
        const newToken = await tokenManager.refreshToken();
        if (mounted) {
          console.log("useAuth: Refresh successful, setting token");
          setToken(newToken);
          setAccessToken(newToken); // Sync with API module
        }
      } catch (error) {
        console.log("useAuth: No valid session", error);
        if (mounted) {
          clearAuth();
          setAccessToken(null); // Clear API module token
        }
      } finally {
        if (mounted) {
          setRestoring(false);
        }
      }
    };

    initAuth();

    return () => {
      mounted = false;
    };
  }, []); // Empty dependency array - only run once

  return {
    isAuthenticated,
    restoring,
    login: (token: string) => {
      console.log("useAuth: Login called");
      tokenManager.setToken(token);
      setAccessToken(token); // Sync with API module
      setToken(token);
    },
    logout: () => {
      console.log("useAuth: Logout called");
      tokenManager.clearToken();
      setAccessToken(null); // Clear API module token
      clearAuth();
    },
  };
};

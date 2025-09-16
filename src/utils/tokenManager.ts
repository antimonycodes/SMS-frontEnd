class TokenManager {
  private accessToken: string | null = null;
  private refreshPromise: Promise<string> | null = null;
  private isRefreshing: boolean = false;

  setToken(token: string | null) {
    this.accessToken = token;
    console.log("TokenManager: Token", token ? "set" : "cleared");
  }

  getToken(): string | null {
    return this.accessToken;
  }

  clearToken() {
    console.log("TokenManager: Clearing all tokens");
    this.accessToken = null;
    this.refreshPromise = null;
    this.isRefreshing = false;
  }

  // Prevent multiple simultaneous refresh attempts
  async refreshToken(): Promise<string> {
    // If already refreshing, wait for the existing promise
    if (this.refreshPromise) {
      console.log("TokenManager: Using existing refresh promise");
      return this.refreshPromise;
    }

    // If currently refreshing but no promise (shouldn't happen), wait a bit
    if (this.isRefreshing) {
      console.log("TokenManager: Waiting for ongoing refresh");
      await new Promise((resolve) => setTimeout(resolve, 100));
      if (this.accessToken) {
        return this.accessToken;
      }
    }

    console.log("TokenManager: Starting new refresh");
    this.isRefreshing = true;
    this.refreshPromise = this.performRefresh();

    try {
      const newToken = await this.refreshPromise;
      this.refreshPromise = null;
      this.isRefreshing = false;
      return newToken;
    } catch (error) {
      this.refreshPromise = null;
      this.isRefreshing = false;
      throw error;
    }
  }

  private async performRefresh(): Promise<string> {
    console.log("TokenManager: Performing refresh request");

    const response = await fetch(
      "http://localhost:3000/api/v1/auth/refresh-token",
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      console.log("TokenManager: Refresh request failed", response.status);
      throw new Error(`Refresh failed: ${response.status}`);
    }

    const data = await response.json();
    console.log("TokenManager: Refresh response received");

    // Handle different response structures
    const newToken = data.data?.accessToken || data.data || data.accessToken;

    if (!newToken) {
      console.log("TokenManager: No token in refresh response");
      throw new Error("No token in refresh response");
    }

    this.setToken(newToken);
    console.log("TokenManager: New token set successfully");
    return newToken;
  }
}

export const tokenManager = new TokenManager();

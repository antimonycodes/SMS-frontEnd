import { create } from "zustand";

interface AuthState {
  accessToken: string | null;
  restoring: boolean;
  isAuthenticated: boolean;
}

interface AuthActions {
  setToken: (token: string) => void;
  clearAuth: () => void;
  setRestoring: (restoring: boolean) => void;
}

export const useAuthStore = create<AuthState & AuthActions>((set, get) => ({
  // State
  accessToken: null,
  restoring: true,
  isAuthenticated: false,

  // Actions
  setToken: (token: string) => {
    set({
      accessToken: token,
      isAuthenticated: true,
    });
  },

  clearAuth: () => {
    set({
      accessToken: null,
      isAuthenticated: false,
    });
  },

  setRestoring: (restoring: boolean) => {
    set({ restoring });
  },
}));

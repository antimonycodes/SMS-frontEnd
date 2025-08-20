import { create } from 'zustand';

interface StoreState {
  count: number;
  isExploding: boolean;
  increment: () => void;
  decrement: () => void;
  explode: () => void;
  reset: () => void;
}

export const useStore = create<StoreState>((set) => ({
  count: 0,
  isExploding: false,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: Math.max(0, state.count - 1) })),
  explode: () => {
    set({ isExploding: true });
    setTimeout(() => set({ isExploding: false }), 1000);
  },
  reset: () => set({ count: 0, isExploding: false }),
}));
import { create } from "zustand";
import { combine } from "zustand/middleware";

const initialState = {
  isGapiInitialized: false,
  isLocalCacheInitialized: false,
  isEverythingInitialized: false,
};

export const useInitializationStateStore = create(
  combine(initialState, (set) => ({
    markGapiInitialized: () => set({ isGapiInitialized: true }),
    markLocalCacheInitialized: () => set({ isLocalCacheInitialized: true }),
    markEverythingInitialized: () => set({ isEverythingInitialized: true }),
  })),
);

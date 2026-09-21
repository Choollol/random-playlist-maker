import { create } from "zustand";
import { combine } from "zustand/middleware";

const initialState = {
  isGapiInitialized: false,
  isLocalCacheInitialized: false,
  isEverythingInitialized: false,
};

export const useInitializationStateStore = create(
  combine(initialState, (set) => ({
    setGapiInitialized: () => set({ isGapiInitialized: true }),
    setLocalCacheInitialized: () => set({ isLocalCacheInitialized: true }),
    setEverythingInitialized: () => set({ isEverythingInitialized: true }),
  })),
);

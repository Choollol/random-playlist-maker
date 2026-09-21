import { create } from "zustand";
import { combine } from "zustand/middleware";

const initialState = {
  isEverythingInitialized: false,
  isGapiInitialized: false,
  isLocalCacheInitialized: false,
  isDatabaseInitialized: false,
};

export const useInitializationStateStore = create(
  combine(initialState, (set) => ({
    markEverythingInitialized: () => set({ isEverythingInitialized: true }),
    markGapiInitialized: () => set({ isGapiInitialized: true }),
    markLocalCacheInitialized: () => set({ isLocalCacheInitialized: true }),
    markDatabaseInitialized: () => set({ isDatabaseInitialized: true }),
  })),
);

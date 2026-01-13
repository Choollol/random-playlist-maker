import { create } from "zustand";
import { combine } from "zustand/middleware";

const initialState = {
  isGapiInitialized: false,
  isDatabaseInitialized: false,
  isEverythingInitialized: false,
};

export const useInitializationStateStore = create(
  combine(initialState, (set) => ({
    setGapiInitialized: () => set({ isGapiInitialized: true }),
    setDatabaseInitialized: () => set({ isDatabaseInitialized: true }),
    setEverythingInitialized: () => set({ isEverythingInitialized: true }),
  }))
);

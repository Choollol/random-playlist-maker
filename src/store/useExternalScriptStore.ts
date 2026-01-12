import { create } from "zustand";
import { combine } from "zustand/middleware";

const initialState = {
  isGapiInitialized: false,
};

export const useExternalScriptStore = create(
  combine(initialState, (set) => ({
    setGapiInitialized: () => set({ isGapiInitialized: true }),
  }))
);

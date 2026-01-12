import { create } from "zustand";
import { combine } from "zustand/middleware";

const initialState = {
  isGapiInitialized: false,
};

export const useGapiStateStore = create(
  combine(initialState, (set) => ({
    setGapiInitialized: () => set({ isGapiInitialized: true }),
  }))
);

import { create } from "zustand";
import { combine } from "zustand/middleware";

interface State {
  message: string | null;
  retryButtonText: string;
  retryAction: () => void;
}

const initialState: State = {
  message: null,
  retryButtonText: "",
  retryAction: () => undefined,
};

export const useErrorMessageStore = create(
  combine(initialState, (set) => ({
    setErrorMessage: (params: State) => set(params),
    clearErrorMessage: () => set({ message: null }),
  })),
);

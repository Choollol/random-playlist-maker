import { create } from "zustand";
import { combine } from "zustand/middleware";

export const NO_RETRY_ACTION = null;

interface State {
  message: string | null;
  retryButtonText: string;
  retryAction: (() => void) | typeof NO_RETRY_ACTION;
}

const initialState: State = {
  message: null,
  retryButtonText: "",
  retryAction: NO_RETRY_ACTION,
};

export const useErrorMessageStore = create(
  combine(initialState, (set) => ({
    setErrorMessage: (params: State) => set(params),
    clearErrorMessage: () => set({ message: null }),
  })),
);

export { type State as UseErrorMessageStoreState };

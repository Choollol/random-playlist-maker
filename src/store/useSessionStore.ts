import { create } from "zustand";
import { combine } from "zustand/middleware";

import { Session } from "@/lib/auth";
import { getUserIdFromData } from "@/lib/utils/authUtils";

interface State {
  session: Session | null;
}

const initialState: State = {
  session: null,
};

export const useSessionStore = create(
  combine(initialState, (set, get) => ({
    setSession: (session: Session) => {
      set({ session });
    },
    clearSession: () => set({ session: null }),

    isUserSignedIn: () => get().session !== null,

    /** Only use this when the user is known to be signed in */
    getUserId: () => getUserIdFromData(get().session!),
  })),
);

export { type State as UseErrorMessageStoreState };

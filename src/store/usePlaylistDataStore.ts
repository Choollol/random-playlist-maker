import { create } from "zustand";
import { combine } from "zustand/middleware";

const initialState = {
  arePlaylistsRetrieved: false,
};

export const usePlaylistDataStore = create(
  combine(initialState, (set) => ({
    setPlaylistsRetrieved: () => set({ arePlaylistsRetrieved: true }),
  }))
);

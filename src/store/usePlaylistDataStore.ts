import { create } from "zustand";
import { combine } from "zustand/middleware";
import { PlaylistData } from "@/lib/types/playlistTypes";

interface State {
  arePlaylistsRetrieved: boolean;
  playlistData: PlaylistData;
  videoIds: string[];
}

const initialState: State = {
  arePlaylistsRetrieved: false,
  playlistData: {},
  videoIds: [],
};

export const usePlaylistDataStore = create(
  combine(initialState, (set) => ({
    setPlaylistsRetrieved: () => set({ arePlaylistsRetrieved: true }),
    clearPlaylistData: () => set({ playlistData: {} }),
    addPlaylistData: (id: string, data: PlaylistData[string]) =>
      set((state) => ({
        playlistData: Object.assign(state.playlistData, { [id]: data }),
      })),
    setVideoIds: (videoIds: string[]) => set({ videoIds: videoIds }),
  })),
);

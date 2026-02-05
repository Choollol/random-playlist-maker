import { OverlayMessage } from "@/lib/types/playlistTypes";
import { create } from "zustand";
import { combine } from "zustand/middleware";

interface State {
  overlayTitle: string;
  overlayMessage: OverlayMessage;
}

const initialState: State = {
  overlayTitle: "",
  overlayMessage: null,
};

export const useOverlayMessageStore = create(
  combine(initialState, (set) => ({
    setOverlayMessage: (overlayMessage: OverlayMessage) =>
      set({ overlayMessage: overlayMessage }),
    setOverlayTitle: (overlayTitle: string) =>
      set({ overlayTitle: overlayTitle }),
  })),
);

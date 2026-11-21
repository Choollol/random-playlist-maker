import { create } from "zustand";

import {
  OVERLAY_MESSAGE_WAIT,
  OverlayMessage,
  SetOverlayMessageCallback,
} from "@/common/lib/utils/overlayMessageUtils";

interface State {
  overlayTitle: string;
  overlayMessage: OverlayMessage;
  doWait: boolean;
}

const initialState: State = {
  overlayTitle: "",
  overlayMessage: null,
  doWait: false,
};

interface Functions {
  setOverlayMessage: SetOverlayMessageCallback;
  setOverlayTitle: (overlayTitle: string) => void;
}

export const useOverlayMessageStore = create<State & Functions>((set) => ({
  ...initialState,
  setOverlayMessage: (overlayMessage) => {
    if (overlayMessage === OVERLAY_MESSAGE_WAIT) {
      set({ doWait: true });
    } else {
      set({ overlayMessage: overlayMessage, doWait: false });
    }
  },
  setOverlayTitle: (overlayTitle) => {
    set({ overlayTitle: overlayTitle });
  },
}));

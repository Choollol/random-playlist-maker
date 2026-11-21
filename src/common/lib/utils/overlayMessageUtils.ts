import { ReactNode } from "react";

export const OVERLAY_MESSAGE_CLOSE = null;
export const OVERLAY_MESSAGE_WAIT = Symbol("Keep overlay message open until user closes it");

export type OverlayMessage = ReactNode;

export type SetOverlayMessageCallback = (
  message: OverlayMessage | typeof OVERLAY_MESSAGE_WAIT,
) => void;

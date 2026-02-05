import { Playlist, PlaylistItem } from "@/lib/types/gapiTypes";
import { ReactNode } from "react";

export interface PlaylistData {
  [playlistId: string]: {
    etag: string;
    playlist: Playlist;
    playlistItems: PlaylistItem[];
  };
}

/**
 * Make this a `string[]` when each element needs to be on a different line.
 */
export type OverlayMessage = ReactNode;

export type SetMessageCallback = (message: OverlayMessage) => void;

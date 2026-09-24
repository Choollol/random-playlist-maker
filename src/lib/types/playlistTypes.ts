import { ReactNode } from "react";

import { Playlist, PlaylistItem } from "@/lib/types/gapiTypes";

export interface PlaylistData {
  [playlistId: string]: {
    etag: string;
    playlist: Playlist;
    playlistItems: PlaylistItem[];
  };
}

export type OverlayMessage = ReactNode;

export type SetMessageCallback = (message: OverlayMessage) => void;

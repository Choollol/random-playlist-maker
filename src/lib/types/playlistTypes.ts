import { Playlist, PlaylistItem } from "@/lib/types/gapiTypes";

export interface PlaylistData {
  [playlistId: string]: {
    etag: string;
    playlist: Playlist;
    playlistItems: PlaylistItem[];
  };
}

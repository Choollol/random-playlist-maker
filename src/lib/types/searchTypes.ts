import { searchKeys } from "@/lib/utils/searchUtils";

export type FlattenedPlaylistItem = Record<
  Exclude<(typeof searchKeys)[number], "playlistTitles">,
  string
> & {
  playlistTitles: string[];
  videoId: string;
};

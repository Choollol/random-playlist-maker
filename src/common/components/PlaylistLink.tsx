import { Link } from "@mui/material";

import { getPlaylistLink } from "@/common/lib/playlist-management/youtubeUtils";

interface Props {
  playlistId: string;
}

export const PlaylistLink = ({ playlistId }: Props) => {
  const playlistLink = getPlaylistLink(playlistId);
  return (
    <Link href={playlistLink} target="_blank">
      {playlistLink}
    </Link>
  );
};

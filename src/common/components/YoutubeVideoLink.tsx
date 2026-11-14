import { Link } from "@mui/material";

import { getVideoLink } from "@/common/lib/playlist-management/youtubeUtils";

interface Props {
  videoId: string;
}

export const YoutubeVideoLink = ({ videoId }: Props) => {
  const videoLink = getVideoLink(videoId);
  return (
    <Link href={videoLink} target="_blank">
      {videoLink}
    </Link>
  );
};

import useIsMobile from "@/hooks/useIsMobile";
import { Button, IconButton, Typography } from "@mui/material";
import Link from "next/link";
import HomeIcon from "@mui/icons-material/Home";

const HomeLinkButton = () => {
  const isMobile = useIsMobile();

  return isMobile ? (
    <IconButton href="/" LinkComponent={Link} size="large">
      <HomeIcon />
    </IconButton>
  ) : (
    <Button href="/" LinkComponent={Link}>
      <Typography variant="h6">PickSome Playlist Maker</Typography>
    </Button>
  );
};

export default HomeLinkButton;

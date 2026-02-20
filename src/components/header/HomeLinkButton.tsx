import { IconButton } from "@mui/material";
import Link from "next/link";
import Image from "next/image";

const LOGO_WIDTH = 40;

const HomeLinkButton = () => {
  return (
    <IconButton href="/" LinkComponent={Link} size="large" disableRipple>
      <Image
        src="/logo.png"
        width={LOGO_WIDTH}
        height={LOGO_WIDTH}
        alt="Home page button"
      />
    </IconButton>
  );
};

export default HomeLinkButton;

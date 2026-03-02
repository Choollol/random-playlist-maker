"use client";

import { IconButton, Tooltip } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import { createStyleGroup } from "@/lib/styling/styling";

const LOGO_WIDTH = 36;

const styles = createStyleGroup({
  button: {
    margin: 0,
    padding: 1,
  },
});

const HomeLinkButton = () => {
  return (
    <Tooltip title="Home">
      <IconButton
        href="/"
        LinkComponent={Link}
        size="large"
        disableRipple
        sx={styles.button}
      >
        <Image
          src="/logo.png"
          width={LOGO_WIDTH}
          height={LOGO_WIDTH}
          alt="Home page button"
        />
      </IconButton>
    </Tooltip>
  );
};

export default HomeLinkButton;

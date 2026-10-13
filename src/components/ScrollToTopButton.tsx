import { ArrowUpward } from "@mui/icons-material";
import { Fab, Fade } from "@mui/material";
import { useEffect, useEffectEvent, useState } from "react";

import { createStyleGroup } from "@/lib/styling/styling";

const styles = createStyleGroup({
  button: {
    position: "fixed",
    bottom: 40,
    right: 40,
  },
});

export const ScrollToTopButton = () => {
  const [show, setShow] = useState(false);

  const handleClick = () => {
    globalThis.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleScroll = useEffectEvent(() => {
    setShow(globalThis.scrollY > 0);
  });

  useEffect(() => {
    globalThis.addEventListener("scroll", handleScroll);

    return () => {
      globalThis.removeEventListener("scroll", handleScroll);
    };
  });

  return (
    <Fade in={show}>
      <Fab onClick={handleClick} sx={styles.button}>
        <ArrowUpward />
      </Fab>
    </Fade>
  );
};

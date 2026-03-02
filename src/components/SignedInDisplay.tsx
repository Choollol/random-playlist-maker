"use client";

import CreatePlaylistForm from "@/components/CreatePlaylistForm";
import Initializer from "@/components/Initializer";
import RetrievePlaylists from "@/components/RetrievePlaylists";
import { createStyleGroup } from "@/lib/styling/styling";
import { Box } from "@mui/material";
import Script from "next/script";
import { useState } from "react";

const styles = createStyleGroup({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "80px 10px",
  },
});

const SignedInDisplay = () => {
  const [isGapiLoaded, setIsGapiLoaded] = useState(false);

  const handleGapiLoad = () => {
    gapi.load("client", () => {
      setIsGapiLoaded(true);
    });
  };

  return (
    <>
      <Script src="https://apis.google.com/js/api.js" onLoad={handleGapiLoad} />

      <Initializer isGapiLoaded={isGapiLoaded} />

      <Box sx={styles.container}>
        <RetrievePlaylists />
        <CreatePlaylistForm />
      </Box>
    </>
  );
};

export default SignedInDisplay;

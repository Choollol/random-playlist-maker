"use client";

import { Stack } from "@mui/material";
import Script from "next/script";
import { useState } from "react";

import CreatePlaylistForm from "@/components/CreatePlaylistForm";
import Initializer from "@/components/Initializer";
import { PlaylistSearch } from "@/components/PlaylistSearch";
import RetrievePlaylists from "@/components/RetrievePlaylists";
import { createStyleGroup } from "@/lib/styling/styling";

const styles = createStyleGroup({
  container: (theme) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "auto",
    padding: "80px 10px",
    [theme.breakpoints.up("sm")]: {
      width: 600,
    },
    [theme.breakpoints.down("sm")]: {
      width: "90%",
    },
  }),
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

      <RetrievePlaylists />

      <Stack sx={styles.container} spacing={10}>
        <CreatePlaylistForm />
        <PlaylistSearch />
      </Stack>
    </>
  );
};

export default SignedInDisplay;

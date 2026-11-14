"use client";

import { Stack } from "@mui/material";
import Script from "next/script";
import { useState } from "react";

import useOnMount from "@/common/hooks/useOnMount";
import { Session } from "@/common/lib/auth/auth";
import { createStyleGroup } from "@/common/lib/styling/styling";
import { useSessionStore } from "@/common/store/useSessionStore";
import Initializer from "@/features/application/Initializer";
import RetrievePlaylists from "@/features/application/RetrievePlaylists";
import CreatePlaylistForm from "@/features/create-playlist-form/CreatePlaylistForm";
import { PlaylistSearch } from "@/features/search-playlists/PlaylistSearch";

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

interface Props {
  sessionData: Session;
}

const SignedInDisplay = ({ sessionData }: Props) => {
  const [isGapiLoaded, setIsGapiLoaded] = useState(false);

  const setSession = useSessionStore((state) => state.setSession);

  const handleGapiLoad = () => {
    gapi.load("client", () => {
      setIsGapiLoaded(true);
    });
  };

  useOnMount(() => {
    setSession(sessionData);
  });

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

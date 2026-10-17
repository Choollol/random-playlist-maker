"use client";

import { Stack } from "@mui/material";
import Script from "next/script";
import { useState } from "react";

import CreatePlaylistForm from "@/components/CreatePlaylistForm";
import Initializer from "@/components/Initializer";
import RetrievePlaylists from "@/components/RetrievePlaylists";
import { PlaylistSearch } from "@/components/search/PlaylistSearch";
import useOnMount from "@/hooks/useOnMount";
import { Session } from "@/lib/auth";
import { createStyleGroup } from "@/lib/styling/styling";
import { useSessionStore } from "@/store/useSessionStore";

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

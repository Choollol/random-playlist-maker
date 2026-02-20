import Initializer from "@/components/Initializer";
import { defaultStyles, theme } from "@/lib/styling/defaultStyling";
import { CssBaseline, GlobalStyles, ThemeProvider } from "@mui/material";
import type { AppProps } from "next/app";
import Script from "next/script";
import { useState } from "react";
import { SnackbarProvider } from "notistack";
import StatusMessageOverlay from "@/components/StatusMessageOverlay";
import ErrorMessageOverlay from "@/components/ErrorMessageOverlay";
import Head from "next/head";

const globalStyles = <GlobalStyles styles={defaultStyles} />;

export default function App({ Component, pageProps }: AppProps) {
  const [isGapiLoaded, setIsGapiLoaded] = useState(false);

  const handleGapiLoad = () => {
    gapi.load("client", () => {
      setIsGapiLoaded(true);
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>PickSome Playlist Maker</title>
        <meta
          name="description"
          content="Create randomized YouTube playlists!"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.png" />
      </Head>

      <CssBaseline />
      {globalStyles}

      <Script src="https://apis.google.com/js/api.js" onLoad={handleGapiLoad} />

      <Initializer isGapiLoaded={isGapiLoaded} />

      <SnackbarProvider />

      <Component {...pageProps} />

      <StatusMessageOverlay />
      <ErrorMessageOverlay />
    </ThemeProvider>
  );
}

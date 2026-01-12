import useIsSignedIn from "@/hooks/useIsSignedIn";
import { defaultStyles, theme } from "@/lib/styling/defaultStyling";
import { initGapiClient } from "@/lib/utils/gapiUtils";
import { useExternalScriptStore } from "@/store/useExternalScriptStore";
import { CssBaseline, GlobalStyles, ThemeProvider } from "@mui/material";
import type { AppProps } from "next/app";
import Script from "next/script";
import { useEffect, useState } from "react";

const globalStyles = <GlobalStyles styles={defaultStyles} />;

export default function App({ Component, pageProps }: AppProps) {
  const isSignedIn = useIsSignedIn();
  const setGapiInitialized = useExternalScriptStore(
    (state) => state.setGapiInitialized
  );

  const [isGapiLoaded, setIsGapiLoaded] = useState(false);

  useEffect(() => {
    if (isSignedIn && isGapiLoaded) {
      (async function () {
        await initGapiClient();
        setGapiInitialized();
      })();
    }
  }, [isSignedIn, isGapiLoaded, setGapiInitialized]);

  const handleGapiLoad = () => {
    gapi.load("client", () => {
      setIsGapiLoaded(true);
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {globalStyles}

      <Script src="https://apis.google.com/js/api.js" onLoad={handleGapiLoad} />

      <Component {...pageProps} />
    </ThemeProvider>
  );
}

import Initializer from "@/components/Initializer";
import { defaultStyles, theme } from "@/lib/styling/defaultStyling";
import { CssBaseline, GlobalStyles, ThemeProvider } from "@mui/material";
import type { AppProps } from "next/app";
import Script from "next/script";
import { useState } from "react";

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
      <CssBaseline />
      {globalStyles}

      <Script src="https://apis.google.com/js/api.js" onLoad={handleGapiLoad} />

      <Initializer isGapiLoaded={isGapiLoaded} />

      <Component {...pageProps} />
    </ThemeProvider>
  );
}

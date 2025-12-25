import { defaultStyles, theme } from "@/lib/styling/defaultStyling";
import "@/styles/globals.css";
import { GlobalStyles, ThemeProvider } from "@mui/material";
import type { AppProps } from "next/app";

const globalStyles = <GlobalStyles styles={defaultStyles} />;

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      {globalStyles}

      <Component {...pageProps} />
    </ThemeProvider>
  );
}

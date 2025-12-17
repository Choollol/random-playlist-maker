import TestButton from "@/components/TestButton";
import { defaultStyles, muiTheme } from "@/lib/styling/defaultStyling";
import "@/styles/globals.css";
import { GlobalStyles, ThemeProvider } from "@mui/material";
import type { AppProps } from "next/app";

const globalStyles = <GlobalStyles styles={defaultStyles} />;

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={muiTheme}>
      {globalStyles}

      <TestButton />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

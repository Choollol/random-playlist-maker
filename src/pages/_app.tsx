import { defaultStyles, theme } from "@/lib/styling/defaultStyling";
import { CssBaseline, GlobalStyles, ThemeProvider } from "@mui/material";
import type { AppProps } from "next/app";

const globalStyles = <GlobalStyles styles={defaultStyles} />;

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {globalStyles}

      <Component {...pageProps} />
    </ThemeProvider>
  );
}

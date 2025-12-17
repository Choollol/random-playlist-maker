import { createTheme, CSSProperties, responsiveFontSizes } from "@mui/material";
import "@fontsource/roboto";

export const defaultStyles: CSSProperties = {
  html: {
    maxWidth: "100vw",
    overflowX: "hidden",
  },
  body: {
    maxWidth: "100vw",
    overflowX: "hidden",
    color: "var(--foreground)",
    background: "var(--background)",
    WebKitFontSmoothing: "antialiased",
    MozOsxFontSmoothing: "grayscale",
  },
  a: {
    color: "inherit",
    textDecoration: "none",
  },
};

const headerCommonStyles: CSSProperties = {};

let muiTheme = createTheme({
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: ["Roboto", "Helvetica", "Arial", "sans-serif"].join(","),
        },
      },
    },
  },
  typography: {
    h1: {
      ...headerCommonStyles,
    },
    h2: {
      ...headerCommonStyles,
    },
    h3: {
      ...headerCommonStyles,
    },
    h4: {
      ...headerCommonStyles,
    },
    h5: {
      ...headerCommonStyles,
    },
    h6: {
      ...headerCommonStyles,
    },
  },
});

muiTheme = responsiveFontSizes(muiTheme);

export { muiTheme };

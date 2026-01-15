import {
  createTheme,
  CSSProperties,
  responsiveFontSizes,
  Theme,
} from "@mui/material";
import "@fontsource/roboto";

declare module "@mui/material/styles" {
  interface ZIndex {
    overlay: number;
  }
}

const headerCommonStyles: CSSProperties = {};

const defaultMuiTheme = createTheme();

let theme = createTheme({
  colorSchemes: {
    dark: true,
  },
  zIndex: {
    ...defaultMuiTheme.zIndex,
    overlay: 1600,
  },
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

theme = responsiveFontSizes(theme);

export const defaultStyles: CSSProperties = {
  body: {
    WebKitFontSmoothing: "antialiased",
    MozOsxFontSmoothing: "grayscale",
    color: (theme: Theme) => theme.palette.text.primary,
    background: (theme: Theme) => theme.palette.background,
  },
  a: {
    color: "inherit",
    textDecoration: "none",
  },
};

export { theme };

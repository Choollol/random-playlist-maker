"use client";

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

const headerCommonStyles: CSSProperties = {
  fontWeight: "400",
};

const DEFAULT_HUE = 268;

const defaultMuiTheme = createTheme();

let theme = createTheme({
  colorSchemes: {
    light: {
      palette: {
        background: {
          default: `hsl(${DEFAULT_HUE}, 20%, 98%)`,
        },
      },
    },
    dark: {
      palette: {
        background: {
          default: `hsl(${DEFAULT_HUE}, 10%, 12%)`,
        },
      },
    },
  },
  cssVariables: {
    colorSchemeSelector: "class",
  },
  zIndex: {
    ...defaultMuiTheme.zIndex,
    overlay: 1600,
  },
  components: {
    MuiLink: {
      defaultProps: {
        target: "_blank",
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

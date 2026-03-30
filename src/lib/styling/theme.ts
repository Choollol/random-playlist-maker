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

export const PRIMARY_HUE = 268;

const defaultMuiTheme = createTheme();

let theme = createTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: `hsl(${PRIMARY_HUE}, 50%, 30%)`,
        },
        background: {
          default: `hsl(${PRIMARY_HUE}, 20%, 98%)`,
        },
        action: {
          active: "rgba(0, 0, 0, 0.8)",
        },
      },
    },
    dark: {
      palette: {
        primary: {
          main: `hsl(${PRIMARY_HUE}, 50%, 75%)`,
        },
        background: {
          default: `hsl(${PRIMARY_HUE}, 10%, 10%)`,
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
      styleOverrides: {
        root: {
          color: "inherit",
          textDecoration: "underline",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
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

import { defaultStyles, theme } from "@/lib/styling/theme";
import { CssBaseline, GlobalStyles, ThemeProvider } from "@mui/material";
import StatusMessageOverlay from "@/components/StatusMessageOverlay";
import ErrorMessageOverlay from "@/components/ErrorMessageOverlay";
import { Metadata, Viewport } from "next";
import { setEnvVariables } from "@/lib/utils/envUtils";
import { ENV } from "@/env";
import Snackbar from "@/components/Snackbar";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { roboto } from "@/lib/styling/font";

const globalStyles = <GlobalStyles styles={defaultStyles} />;

export const metadata: Metadata = {
  title: "PickSome Playlist Maker",
  description: "Create randomized YouTube playlists!",
  icons: {
    icon: [
      {
        url: "/logo.png",
        type: "image.png",
        sizes: "256x256",
      },
    ],
  },
};

export const viewport: Viewport = {
  width: "device-scale",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  setEnvVariables(ENV.GOOGLE_API_KEY, ENV.GOOGLE_CLIENT_ID);

  return (
    <html lang="en" className={roboto.variable}>
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {globalStyles}

            <Snackbar />

            {children}

            <StatusMessageOverlay />
            <ErrorMessageOverlay />
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}

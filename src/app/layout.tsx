import { CssBaseline, GlobalStyles, InitColorSchemeScript, ThemeProvider } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import { Metadata, Viewport } from "next";

import Snackbar from "@/common/components/Snackbar";
import { roboto } from "@/common/lib/styling/font";
import { defaultStyles, theme } from "@/common/lib/styling/theme";
import { setEnvVariables } from "@/common/lib/utils/envUtils";
import { ENV } from "@/env";
import ErrorMessageOverlay from "@/features/error-message/ErrorMessageOverlay";
import StatusMessageOverlay from "@/features/status-message-dialog/StatusMessageOverlay";

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  setEnvVariables(ENV.GOOGLE_API_KEY, ENV.GOOGLE_CLIENT_ID);

  return (
    <html
      lang="en"
      className={roboto.variable}
      // Suppress error that comes from using `InitColorSchemeScript`
      suppressHydrationWarning
    >
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {globalStyles}
            <InitColorSchemeScript attribute="class" />

            <Snackbar />

            <main>{children}</main>

            <StatusMessageOverlay />
            <ErrorMessageOverlay />
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}

import { Paper, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useEffectEvent, useState } from "react";

import { StatusMessageDialog } from "@/common/components/StatusMessageDialog";
import { signOutGoogle } from "@/common/lib/auth/authClient";
import { retrievePlaylistData } from "@/common/lib/playlist-management/playlistManagement";
import { createStyleGroup } from "@/common/lib/styling/styling";
import { useInitializationStateStore } from "@/common/store/useInitializationStateStore";

const styles = createStyleGroup({
  collapsedContainer: {
    position: "absolute",
    right: 0,
    margin: 2,
    padding: 2,
    width: "fit-content",
    textAlign: "center",
  },
});

const RetrievePlaylists = () => {
  const [message, setMessage] = useState<ReactNode>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const isEverythingInitialized = useInitializationStateStore(
    (state) => state.isEverythingInitialized,
  );

  const router = useRouter();

  const handleClose = () => {
    setIsCollapsed(true);
  };

  const signOut = useEffectEvent(async () => {
    await signOutGoogle(router);
  });

  useEffect(() => {
    if (isEverythingInitialized) {
      (async () => {
        try {
          await retrievePlaylistData(setMessage);
          setIsCollapsed(false);
        } catch (error) {
          if ((error as gapi.client.HttpRequestRejected).status === 401) {
            signOut();
          }
        }
      })();
    }
  }, [isEverythingInitialized]);

  return isCollapsed ? (
    <Paper elevation={2} sx={styles.collapsedContainer}>
      <Typography>{message}</Typography>
    </Paper>
  ) : (
    <StatusMessageDialog open={Boolean(message)} onClose={handleClose}>
      <StatusMessageDialog.Title>Retrieving data...</StatusMessageDialog.Title>

      <StatusMessageDialog.Divider />

      <StatusMessageDialog.Content>
        {message}
        <Typography variant="caption" sx={{ display: "block", marginTop: 3 }}>
          Click anywhere in the background to collapse this dialog
        </Typography>
      </StatusMessageDialog.Content>
    </StatusMessageDialog>
  );
};

export default RetrievePlaylists;

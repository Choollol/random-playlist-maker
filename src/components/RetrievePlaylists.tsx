import { StatusMessageDialog } from "@/components/_common/StatusMessageDialog/StatusMessageDialog";
import { StatusMessageDialogContent } from "@/components/_common/StatusMessageDialog/StatusMessageDialogContent";
import { StatusMessageDialogDivider } from "@/components/_common/StatusMessageDialog/StatusMessageDialogDivider";
import { StatusMessageDialogTitle } from "@/components/_common/StatusMessageDialog/StatusMessageDialogTitle";
import { retrievePlaylistData } from "@/lib/playlistManagement";
import { createStyleGroup } from "@/lib/styling/styling";
import { useInitializationStateStore } from "@/store/useInitializationStateStore";
import { usePlaylistDataStore } from "@/store/usePlaylistDataStore";
import { Paper, Typography } from "@mui/material";
import { ReactNode, useEffect, useState } from "react";

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

  const markPlaylistsRetrieved = usePlaylistDataStore(
    (state) => state.markPlaylistsRetrieved,
  );

  const handleClose = () => {
    setIsCollapsed(true);
  };

  useEffect(() => {
    if (isEverythingInitialized) {
      (async () => {
        const success = await retrievePlaylistData(setMessage);
        setIsCollapsed(false);
        if (success) {
          markPlaylistsRetrieved();
        } else {
          console.error("Could not retrieve playlists!");
        }
      })();
    }
  }, [isEverythingInitialized, markPlaylistsRetrieved]);

  return isCollapsed ? (
    <Paper elevation={2} sx={styles.collapsedContainer}>
      <Typography>{message}</Typography>
    </Paper>
  ) : (
    <StatusMessageDialog open={Boolean(message)} onClose={handleClose}>
      <StatusMessageDialogTitle>Retrieving data...</StatusMessageDialogTitle>

      <StatusMessageDialogDivider />

      <StatusMessageDialogContent>
        {message}
        <Typography variant="caption" sx={{ display: "block", marginTop: 3 }}>
          Click anywhere in the background to collapse this dialog
        </Typography>
      </StatusMessageDialogContent>
    </StatusMessageDialog>
  );
};

export default RetrievePlaylists;

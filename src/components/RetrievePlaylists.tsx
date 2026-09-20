import { StatusMessageDialog } from "@/components/_common/StatusMessageDialog/StatusMessageDialog";
import { StatusMessageDialogContent } from "@/components/_common/StatusMessageDialog/StatusMessageDialogContent";
import { StatusMessageDialogDivider } from "@/components/_common/StatusMessageDialog/StatusMessageDialogDivider";
import { StatusMessageDialogTitle } from "@/components/_common/StatusMessageDialog/StatusMessageDialogTitle";
import { retrievePlaylistData } from "@/lib/playlistManagement";
import { useInitializationStateStore } from "@/store/useInitializationStateStore";
import { usePlaylistDataStore } from "@/store/usePlaylistDataStore";
import { ReactNode, useEffect, useState } from "react";

const RetrievePlaylists = () => {
  const [message, setMessage] = useState<ReactNode>(null);

  const isEverythingInitialized = useInitializationStateStore(
    (state) => state.isEverythingInitialized,
  );

  const setPlaylistsRetrieved = usePlaylistDataStore(
    (state) => state.setPlaylistsRetrieved,
  );

  useEffect(() => {
    if (isEverythingInitialized) {
      (async () => {
        const success = await retrievePlaylistData(setMessage);
        if (success) {
          setPlaylistsRetrieved();
        } else {
          console.error("Could not retrieve playlists!");
        }
      })();
    }
  }, [isEverythingInitialized, setPlaylistsRetrieved]);

  return (
    <StatusMessageDialog open={Boolean(message)}>
      <StatusMessageDialogTitle>Retrieving data...</StatusMessageDialogTitle>

      <StatusMessageDialogDivider />

      <StatusMessageDialogContent>{message}</StatusMessageDialogContent>
    </StatusMessageDialog>
  );
};

export default RetrievePlaylists;

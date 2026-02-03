import StatusMessageOverlay from "@/components/StatusMessageOverlay";
import { retrievePlaylistData } from "@/lib/playlistManagement";
import { OverlayMessage } from "@/lib/types/playlistTypes";
import { useInitializationStateStore } from "@/store/useInitializationStateStore";
import { usePlaylistDataStore } from "@/store/usePlaylistDataStore";
import { useEffect, useState } from "react";

const RetrievingPlaylistsOverlay = () => {
  const [overlayMessage, setOverlayMessage] = useState<OverlayMessage>(null);

  const isEverythingInitialized = useInitializationStateStore(
    (state) => state.isEverythingInitialized,
  );

  const setPlaylistsRetrieved = usePlaylistDataStore(
    (state) => state.setPlaylistsRetrieved,
  );

  useEffect(() => {
    if (isEverythingInitialized) {
      (async () => {
        await retrievePlaylistData(setOverlayMessage);
        setPlaylistsRetrieved();
      })();
    }
  }, [isEverythingInitialized, setPlaylistsRetrieved]);

  return (
    <StatusMessageOverlay title="Retrieving data..." message={overlayMessage} />
  );
};

export default RetrievingPlaylistsOverlay;

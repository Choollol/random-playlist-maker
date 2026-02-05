import { retrievePlaylistData } from "@/lib/playlistManagement";
import { useInitializationStateStore } from "@/store/useInitializationStateStore";
import { useOverlayMessageStore } from "@/store/useOverlayMessageStore";
import { usePlaylistDataStore } from "@/store/usePlaylistDataStore";
import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";

const RetrievePlaylists = () => {
  const { setOverlayTitle, setOverlayMessage } = useOverlayMessageStore(
    useShallow((state) => ({
      setOverlayTitle: state.setOverlayTitle,
      setOverlayMessage: state.setOverlayMessage,
    })),
  );

  const isEverythingInitialized = useInitializationStateStore(
    (state) => state.isEverythingInitialized,
  );

  const setPlaylistsRetrieved = usePlaylistDataStore(
    (state) => state.setPlaylistsRetrieved,
  );

  useEffect(() => {
    if (isEverythingInitialized) {
      (async () => {
        setOverlayTitle("Retrieving data...");
        await retrievePlaylistData(setOverlayMessage);
        setPlaylistsRetrieved();
      })();
    }
  }, [
    isEverythingInitialized,
    setPlaylistsRetrieved,
    setOverlayTitle,
    setOverlayMessage,
  ]);

  return null;
};

export default RetrievePlaylists;

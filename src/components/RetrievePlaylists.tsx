import { retrievePlaylistData } from "@/lib/playlistManagement";
import { useInitializationStateStore } from "@/store/useInitializationStateStore";
import { useOverlayMessageStore } from "@/store/useOverlayMessageStore";
import { usePlaylistDataStore } from "@/store/usePlaylistDataStore";
import { useEffect } from "react";

const RetrievePlaylists = () => {
  const { setOverlayTitle, setOverlayMessage } = useOverlayMessageStore();

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
        const success = await retrievePlaylistData(setOverlayMessage);
        if (success) {
          setPlaylistsRetrieved();
        } else {
          console.error("Could not retrieve playlists!");
        }
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

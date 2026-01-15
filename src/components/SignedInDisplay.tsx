import CreatePlaylistForm from "@/components/CreatePlaylistForm";
import StatusMessageOverlay from "@/components/StatusMessageOverlay";
import { retrievePlaylistData } from "@/lib/playlistManagement";
import { useInitializationStateStore } from "@/store/useInitializationStateStore";
import { usePlaylistDataStore } from "@/store/usePlaylistDataStore";
import { useEffect } from "react";

const SignedInDisplay = () => {
  const isEverythingInitialized = useInitializationStateStore(
    (state) => state.isEverythingInitialized
  );

  const setPlaylistsRetrieved = usePlaylistDataStore(
    (state) => state.setPlaylistsRetrieved
  );

  useEffect(() => {
    if (isEverythingInitialized) {
      (async () => {
        await retrievePlaylistData();
        setPlaylistsRetrieved();
      })();
    }
  }, [isEverythingInitialized, setPlaylistsRetrieved]);

  return (
    <>
      <StatusMessageOverlay
        title="title"
        message="long message yep yep ype yep yep yep yep yep yep yep yep yep yep yep yep yep yep yep yep yep yep yep yep yep yep yep yep yep yep yep yep"
      />
      <CreatePlaylistForm />
    </>
  );
};

export default SignedInDisplay;

import CreatePlaylistForm from "@/components/CreatePlaylistForm";
import { retrievePlaylistData } from "@/lib/playlistManagement";
import { useInitializationStateStore } from "@/store/useInitializationStateStore";
import { useEffect } from "react";

const SignedInDisplay = () => {
  const isEverythingInitialized = useInitializationStateStore(
    (state) => state.isEverythingInitialized
  );

  useEffect(() => {
    if (isEverythingInitialized) {
      retrievePlaylistData();
    }
  }, [isEverythingInitialized]);

  return (
    <>
      <CreatePlaylistForm />
    </>
  );
};

export default SignedInDisplay;

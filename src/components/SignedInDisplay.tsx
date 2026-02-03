import CreatePlaylistForm from "@/components/CreatePlaylistForm";
import RetrievingPlaylistsOverlay from "@/components/RetrievingPlaylistsOverlay";

const SignedInDisplay = () => {
  return (
    <>
      <RetrievingPlaylistsOverlay />
      <CreatePlaylistForm />
    </>
  );
};

export default SignedInDisplay;

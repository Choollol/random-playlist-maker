import CreatePlaylistForm from "@/components/CreatePlaylistForm";
import RetrievePlaylists from "@/components/RetrievePlaylists";

const SignedInDisplay = () => {
  return (
    <>
      <RetrievePlaylists />
      <CreatePlaylistForm />
    </>
  );
};

export default SignedInDisplay;

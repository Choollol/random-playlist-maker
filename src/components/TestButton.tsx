import { getPlaylists } from "@/lib/utils/playlistUtils";

const TestButton = () => {
  const handleClick = async () => {
    console.log("Test button clicked");

    const playlists = await getPlaylists();
    console.log(playlists);
  };
  return (
    <>
      <button onClick={handleClick}>TestButton</button>
    </>
  );
};

export default TestButton;

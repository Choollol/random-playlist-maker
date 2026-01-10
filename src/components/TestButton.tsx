import { createRandomizedPlaylist } from "@/lib/playlistManagement";

const TestButton = () => {
  const handleClick = async () => {
    console.log("Test button clicked");

    await createRandomizedPlaylist(10, "unlisted");
  };
  return (
    <>
      <button onClick={handleClick}>TestButton</button>
    </>
  );
};

export default TestButton;

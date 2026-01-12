import { createRandomizedPlaylist } from "@/lib/playlistManagement";

const TestButton = () => {
  const handleClick = async () => {
    console.log("Test button clicked");

    // const response = await gapi.client.youtube.playlists.list({
    //   mine: true,
    //   part: "contentDetails, snippet",
    //   maxResults: 50,
    //   pageToken: "",
    // });
    const response = await gapi.client.youtube.playlistItems.list({
      part: "contentDetails, snippet",
      maxResults: 50,
      playlistId: "PL-ZO8qPW21xEnVhnFl6oAQTDMvTDlxMAs",
    });
    const data = JSON.parse(response.body);
    console.log(data);
  };
  return (
    <>
      <button onClick={handleClick}>TestButton</button>
    </>
  );
};

export default TestButton;

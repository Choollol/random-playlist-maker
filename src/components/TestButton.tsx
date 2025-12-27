import useIsSignedIn from "@/hooks/useIsSignedIn";

const TestButton = () => {
  const isSignedIn = useIsSignedIn();
  const handleClick = async () => {
    console.log("Test button clicked");

    if (!isSignedIn) {
      console.log("not signed in");
      return;
    }

    const response = await gapi.client.youtube.playlists.list({
      part: "snippet",
      mine: true,
    });

    // const request = gapi.client.request({
    //   path: "https://www.googleapis.com/youtube/v3/playlists",
    //   params: {
    //     key: apiKey,
    //     part: "contentDetails,snippet",
    //     channelId: "UCHtYMpoIG0dzWCLqhUYJQAQ",
    //   },
    // });
    // const response = await request;
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

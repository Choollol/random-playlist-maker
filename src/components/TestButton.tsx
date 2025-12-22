import Script from "next/script";

interface Props {
  url: string;
  apiKey: string;
  clientId: string;
}

const TestButton = ({ url, apiKey, clientId }: Props) => {
  const handleGapiLoad = () => {
    const initGapi = () => {
      gapi.client.init({
        apiKey: apiKey,
        clientId: clientId,
      });
    };
    gapi.load("client", initGapi);
  };
  const handleClick = async () => {
    console.log("Test button clicked");
    console.log(url);

    const request = gapi.client.request({
      path: "https://www.googleapis.com/youtube/v3/playlists",
      params: {
        key: apiKey,
        part: "contentDetails,snippet",
        channelId: "UCHtYMpoIG0dzWCLqhUYJQAQ",
      },
    });

    const result = await request;
    const data = JSON.parse(result.body);
    console.log(data);
  };
  return (
    <>
      <Script src="https://apis.google.com/js/api.js" onLoad={handleGapiLoad} />
      <button onClick={handleClick}>TestButton</button>
    </>
  );
};

export default TestButton;

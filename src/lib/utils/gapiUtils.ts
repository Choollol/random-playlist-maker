import { authClient } from "@/lib/authClient";
import { googleApiKey } from "@/lib/utils/envUtils";

export const GOOGLE_SCOPES = "https://www.googleapis.com/auth/youtube";

export const PLAYLIST_ITEM_RESOURCE_KIND = "youtube#video";

export const initGapiClient = async () => {
  await gapi.client.init({
    apiKey: googleApiKey,
    discoveryDocs: [
      "https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest",
    ],
  });

  const response = await authClient.getAccessToken({ providerId: "google" });
  const accessToken = response.data?.accessToken;

  if (accessToken !== undefined) {
    gapi.client.setToken({
      access_token: accessToken,
    });
  }
};

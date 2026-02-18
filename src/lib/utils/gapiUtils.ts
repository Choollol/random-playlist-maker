import { authClient } from "@/lib/authClient";
import { catchUnrecoverableError } from "@/lib/error";
import { googleApiKey } from "@/lib/utils/envUtils";

export const GOOGLE_SCOPES = "https://www.googleapis.com/auth/youtube";

export const PLAYLIST_ITEM_RESOURCE_KIND = "youtube#video";

/**
 * @returns `true` if success, `false` if failure
 */
export const initGapiClient = catchUnrecoverableError(
  {
    message:
      "Something went wrong while initializing Google API. Please try again or reload the page.",
    retryButtonText: "Try Again",
    failureReturnValue: false,
  },
  async () => {
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
      return true;
    } else {
      throw new Error("Auth access token is undefined!");
    }
  },
);

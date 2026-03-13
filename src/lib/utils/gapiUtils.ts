"use client";

import { authClient } from "@/lib/authClient";
import { catchUnrecoverableError } from "@/lib/error";
import { googleApiKey } from "@/lib/utils/envUtils";
import { GApiError } from "@/lib/types/gapiTypes";

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
      return false;
    }
  },
);

/**
 * Wrapper around `gapi.client.youtube` calls to handle quota exceeded errors.
 */
export async function catchQuotaError<T>(request: Promise<T>): Promise<T> {
  try {
    return await request;
  } catch (error: unknown) {
    const gapiError = getGapiError(error);
    if (
      gapiError !== null &&
      gapiError.code === 403 &&
      gapiError.errors[0].reason === "quotaExceeded"
    ) {
      window.location.href = "/error/youtube-quota";
    }
    throw error;
  }
}

/**
 * @returns gapi error object if valid, null otherwise.
 */
function getGapiError(error: unknown): GApiError | null {
  if (
    typeof error !== "object" ||
    error === null ||
    !("body" in error) ||
    typeof error.body !== "string"
  ) {
    return null;
  }
  const body = JSON.parse(error.body);
  return Object.hasOwn(body, "error") ? body.error : null;
}

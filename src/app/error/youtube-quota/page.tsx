"use client";

import useOnMount from "@/hooks/useOnMount";
import { useErrorMessageStore } from "@/store/useErrorMessageStore";
import { useShallow } from "zustand/react/shallow";

export default function YoutubeQuotaError() {
  const { setErrorMessage } = useErrorMessageStore(
    useShallow((state) => ({
      setErrorMessage: state.setErrorMessage,
    })),
  );

  useOnMount(() => {
    setErrorMessage({
      message:
        "PickSome Playlist Maker's YouTube API usage has run out and will be unusable until tomorrow. Sorry for the inconvenience!",
      retryButtonText: "",
      retryAction: null,
    });
  });
  return null;
}

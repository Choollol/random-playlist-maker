"use client";

import { useErrorMessageStore } from "@/store/useErrorMessageStore";
import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";

export default function YoutubeQuotaError() {
  const { setErrorMessage } = useErrorMessageStore(
    useShallow((state) => ({
      setErrorMessage: state.setErrorMessage,
    })),
  );

  useEffect(
    () => {
      setErrorMessage({
        message:
          "PickSome Playlist Maker's YouTube API usage has run out and will be unusable until tomorrow. Sorry for the inconvenience!",
        retryButtonText: "",
        retryAction: null,
      });
    },
    // This only needs to run once
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
  return null;
}

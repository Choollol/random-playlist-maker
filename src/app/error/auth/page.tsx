"use client";

import useOnMount from "@/hooks/useOnMount";
import { useErrorMessageStore } from "@/store/useErrorMessageStore";
import { useRouter } from "next/navigation";
import { useShallow } from "zustand/react/shallow";

export default function AuthError() {
  const { setErrorMessage, clearErrorMessage } = useErrorMessageStore(
    useShallow((state) => ({
      setErrorMessage: state.setErrorMessage,
      clearErrorMessage: state.clearErrorMessage,
    })),
  );

  const { push } = useRouter();

  useOnMount(() => {
    const navigateToHome = () => {
      push("/");
      clearErrorMessage();
    };

    setErrorMessage({
      message:
        "Something went wrong while trying to sign in. Please try again or reload the page.",
      retryButtonText: "Go Home",
      retryAction: navigateToHome,
    });
  });
  return null;
}

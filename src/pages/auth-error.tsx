import { useErrorMessageStore } from "@/store/useErrorMessageStore";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";

const AuthError = () => {
  const { setErrorMessage, clearErrorMessage } = useErrorMessageStore(
    useShallow((state) => ({
      setErrorMessage: state.setErrorMessage,
      clearErrorMessage: state.clearErrorMessage,
    })),
  );

  const { push } = useRouter();

  useEffect(
    () => {
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
    },
    // This only needs to run once
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
  return null;
};

export default AuthError;

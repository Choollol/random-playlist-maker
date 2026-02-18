import { authClient } from "@/lib/authClient";
import { showError } from "@/lib/error";
import {
  NO_RETRY_ACTION,
  useErrorMessageStore,
} from "@/store/useErrorMessageStore";
import { Autocomplete, TextField } from "@mui/material";

const TestButton = () => {
  const handleClick = async () => {
    console.log("Test button clicked");

    showError({ type: "recoverable", message: "hi" });
    showError({
      type: "unrecoverable",
      message:
        "Something went wrong while trying to do something. Please try again or reload the page.",
      retryButtonText: "Try Again",
      retryAction: NO_RETRY_ACTION,
    });
  };
  return (
    <>
      <button onClick={handleClick}>TestButton</button>
    </>
  );
};

export default TestButton;

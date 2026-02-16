import { useErrorMessageStore } from "@/store/useErrorMessageStore";
import { enqueueSnackbar } from "notistack";

interface BaseErrorParams {
  errorType: string;
  message: string;
  error?: unknown;
}

interface RecoverableErrorParams extends BaseErrorParams {
  errorType: "recoverable";
}

interface UnrecoverableErrorParams extends BaseErrorParams {
  errorType: "unrecoverable";
  retryButtonText: string;
  retryAction: () => void;
}

export function showError(
  params: RecoverableErrorParams | UnrecoverableErrorParams,
) {
  if (params.errorType === "recoverable") {
    showRecoverableError(params);
  } else {
    showUnrecoverableError(params);
  }

  if (params.error !== undefined) {
    console.error(params.error);
  }
}

function showRecoverableError({ message }: RecoverableErrorParams) {
  enqueueSnackbar({
    message: message,
    variant: "error",
  });
}

function showUnrecoverableError({
  message,
  retryButtonText,
  retryAction,
}: UnrecoverableErrorParams) {
  useErrorMessageStore.setState({ message, retryButtonText, retryAction });
}

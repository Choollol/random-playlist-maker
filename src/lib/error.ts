import {
  useErrorMessageStore,
  UseErrorMessageStoreState,
} from "@/store/useErrorMessageStore";
import { enqueueSnackbar } from "notistack";

interface BaseErrorParams {
  errorType: string;
  message: string;
  error?: unknown;
}

interface RecoverableErrorParams extends BaseErrorParams {
  errorType: "recoverable";
}

type UnrecoverableErrorParams = BaseErrorParams & {
  errorType: "unrecoverable";
} & Omit<UseErrorMessageStoreState, "message">;

type ErrorParams = RecoverableErrorParams | UnrecoverableErrorParams;

export function showError(params: ErrorParams) {
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

export function catchUnrecoverableError(
  errorParams: Omit<
    UnrecoverableErrorParams,
    "errorType" | "retryAction" | "error"
  > & { failureReturnValue: boolean },
  target: (...params: unknown[]) => unknown,
) {
  const showUnrecoverableError = (
    params: unknown[],
    error: UnrecoverableErrorParams["error"],
  ) => {
    showError({
      ...errorParams,
      errorType: "unrecoverable",
      retryAction: () => func(...params),
      error: error,
    });
  };

  const func = (...params: unknown[]) => {
    try {
      const returnValue = target(...params);
      if (returnValue instanceof Promise) {
        return returnValue.catch((error) => {
          showUnrecoverableError(params, error);
        });
      } else {
        return returnValue;
      }
    } catch (error) {
      showUnrecoverableError(params, error);
    }
  };

  return func;
}

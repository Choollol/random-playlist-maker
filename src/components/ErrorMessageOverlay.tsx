import { createStyleGroup } from "@/lib/styling/styling";
import { BUG_REPORT_URL } from "@/lib/utils/miscUtils";
import { useErrorMessageStore } from "@/store/useErrorMessageStore";
import {
  Backdrop,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Link,
  Typography,
} from "@mui/material";
import { useShallow } from "zustand/react/shallow";

const styles = createStyleGroup({
  dialog: (theme) => ({
    color: theme.palette.error.contrastText,
    "& .MuiPaper-root": { backgroundColor: theme.palette.error.main },
  }),
  retryButton: (theme) => ({
    alignSelf: "center",
    "& .MuiButton-text": {
      color: theme.palette.error.contrastText,
    },
  }),
  bugReportLink: (theme) => ({
    color: theme.palette.error.contrastText,
    textDecoration: "underline",
  }),
});

const ErrorMessageOverlay = () => {
  const { message, retryButtonText, retryAction, clearErrorMessage } =
    useErrorMessageStore(
      useShallow((state) => ({
        message: state.message,
        retryButtonText: state.retryButtonText,
        retryAction: state.retryAction,
        clearErrorMessage: state.clearErrorMessage,
      })),
    );

  const handleClick = () => {
    retryAction!();
    clearErrorMessage();
  };

  return message !== null ? (
    <>
      <Backdrop open={true} />
      <Dialog open={true} maxWidth={"xs"} sx={styles.dialog}>
        <DialogTitle>Error</DialogTitle>

        <DialogContent>
          <Typography>{message}</Typography>
        </DialogContent>

        <DialogContent>
          <Typography>
            If this error persists, please{" "}
            <Link href={BUG_REPORT_URL} sx={styles.bugReportLink}>
              submit a bug report
            </Link>
          </Typography>
        </DialogContent>

        {retryAction !== null && (
          <DialogActions sx={styles.retryButton}>
            <Button onClick={handleClick}>{retryButtonText}</Button>
          </DialogActions>
        )}
      </Dialog>
    </>
  ) : null;
};

export default ErrorMessageOverlay;

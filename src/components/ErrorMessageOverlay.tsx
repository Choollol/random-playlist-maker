import { createStyleGroup } from "@/lib/styling/styling";
import { useErrorMessageStore } from "@/store/useErrorMessageStore";
import {
  Backdrop,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
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
});

const ErrorMessageOverlay = () => {
  const { message, retryButtonText, retryAction } = useErrorMessageStore(
    useShallow((state) => ({
      message: state.message,
      retryButtonText: state.retryButtonText,
      retryAction: state.retryAction,
    })),
  );

  return message !== null ? (
    <>
      <Backdrop open={true} />
      <Dialog open={true} maxWidth={"xs"} sx={styles.dialog}>
        <DialogTitle>Error</DialogTitle>
        <DialogContent>
          <Typography>{message}</Typography>
        </DialogContent>
        {retryAction !== null && (
          <DialogActions sx={styles.retryButton}>
            <Button onClick={retryAction}>{retryButtonText}</Button>
          </DialogActions>
        )}
      </Dialog>
    </>
  ) : null;
};

export default ErrorMessageOverlay;

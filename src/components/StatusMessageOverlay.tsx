import { createStyleGroup } from "@/lib/styling/styling";
import { isDefined } from "@/lib/utils/typeUtils";
import { useOverlayMessageStore } from "@/store/useOverlayMessageStore";
import { Backdrop, Box, Stack, Typography } from "@mui/material";

const styles = createStyleGroup({
  container: (theme) => ({
    zIndex: theme.zIndex.overlay,
    position: "absolute",
    alignItems: "center",
    textAlign: "center",
    top: 0,
    width: "100vw",
    height: "100vh",
    padding: "0 10%",
  }),
  textContainer: {
    position: "relative",
    top: "15%",
  },
  title: {
    marginBottom: "120px",
  },
});

/**
 * Pass `null` to message to disable the overlay.
 */
const StatusMessageOverlay = () => {
  const { overlayTitle, overlayMessage } = useOverlayMessageStore();

  return isDefined(overlayMessage) ? (
    <Stack sx={styles.container}>
      <Backdrop open={true} />

      <Box sx={styles.textContainer}>
        <Typography variant="h2" sx={styles.title}>
          {overlayTitle}
        </Typography>
        <Typography variant="h5">{overlayMessage}</Typography>
      </Box>
    </Stack>
  ) : null;
};

export default StatusMessageOverlay;

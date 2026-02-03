import { createStyles } from "@/lib/styling/styling";
import { OverlayMessage } from "@/lib/types/playlistTypes";
import { joinWithElement } from "@/lib/utils/collectionUtils";
import { Backdrop, Box, Stack, Typography } from "@mui/material";

interface Props {
  title: string;
  message: OverlayMessage;
}

const styles = createStyles({
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
const StatusMessageOverlay = ({ title, message }: Props) => {
  const text = Array.isArray(message) ? joinWithElement(message, <br />) : message;
  return message !== null ? (
    <Stack sx={styles.container}>
      <Backdrop open={true} />

      <Box sx={styles.textContainer}>
        <Typography variant="h2" sx={styles.title}>
          {title}
        </Typography>
        <Typography variant="h5">{text}</Typography>
      </Box>
    </Stack>
  ) : null;
};

export default StatusMessageOverlay;

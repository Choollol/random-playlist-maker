import { createStyles } from "@/lib/styling/styling";
import { Box, Stack, Typography } from "@mui/material";

interface Props {
  title: string;
  message: string;
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
    background: "hsla(0, 0%, 0%, 0.4)",
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

const StatusMessageOverlay = ({ title, message }: Props) => {
  return (
    <Stack sx={styles.container}>
      <Box sx={styles.textContainer}>
        <Typography variant="h2" sx={styles.title}>
          {title}
        </Typography>
        <Typography variant="h5">{message}</Typography>
      </Box>
    </Stack>
  );
};

export default StatusMessageOverlay;

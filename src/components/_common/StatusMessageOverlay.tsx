"use client";

import { createStyleGroup } from "@/lib/styling/styling";
import { isDefined } from "@/lib/utils/typeUtils";
import { useOverlayMessageStore } from "@/store/useOverlayMessageStore";
import { Box, Dialog, DialogContent, Divider, Typography } from "@mui/material";

const styles = createStyleGroup({
  contentContainer: {
    textAlign: "center",
    padding: "16px 8px",
    width: "min(480px, 80vw)",
    minHeight: "200px",
  },
  title: {
    marginBottom: "8px",
  },
  divider: {
    margin: "16px 0px",
  },
});

const StatusMessageOverlay = () => {
  const { overlayTitle, overlayMessage } = useOverlayMessageStore();

  return (
    <Dialog open={isDefined(overlayMessage)}>
      <Box sx={styles.contentContainer}>
        <Typography variant="h4" sx={styles.title}>
          {overlayTitle}
        </Typography>

        <Divider sx={styles.divider} />

        <DialogContent>
          <Typography variant="h5">{overlayMessage}</Typography>
        </DialogContent>
      </Box>
    </Dialog>
  );
};

export default StatusMessageOverlay;

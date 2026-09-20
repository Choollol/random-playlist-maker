import { createStyleGroup } from "@/lib/styling/styling";
import { Box, Dialog } from "@mui/material";
import { ReactNode } from "react";

const styles = createStyleGroup({
  contentContainer: {
    textAlign: "center",
    padding: "16px 8px",
    width: "min(480px, 80vw)",
    minHeight: "200px",
  },
});

interface Props {
  children: ReactNode;
  open: boolean;
}

export const StatusMessageDialog = ({ children, open }: Props) => {
  return (
    <Dialog open={open}>
      <Box sx={styles.contentContainer}>{children}</Box>
    </Dialog>
  );
};

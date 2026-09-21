import { createStyleGroup } from "@/lib/styling/styling";
import { Box, Dialog } from "@mui/material";
import { ComponentProps, ReactNode } from "react";

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
}

export const StatusMessageDialog = ({
  children,
  ...dialogProps
}: Props & ComponentProps<typeof Dialog>) => {
  return (
    <Dialog {...dialogProps}>
      <Box sx={styles.contentContainer}>{children}</Box>
    </Dialog>
  );
};

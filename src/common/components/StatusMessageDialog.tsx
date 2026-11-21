import { Box, Dialog, DialogContent, Divider, Typography } from "@mui/material";
import { ComponentProps, ReactNode } from "react";

import { createStyleGroup } from "@/common/lib/styling/styling";

const styles = createStyleGroup({
  contentContainer: {
    textAlign: "center",
    padding: "16px 8px",
    width: "min(480px, 80vw)",
    minHeight: "200px",
  },
  divider: {
    margin: "16px 0px",
  },
  title: {
    marginBottom: "8px",
  },
});

type ContainerProps = ComponentProps<typeof Dialog> & {
  children: ReactNode;
};

export const StatusMessageDialog = ({ children, ...dialogProps }: ContainerProps) => {
  return (
    <Dialog {...dialogProps}>
      <Box sx={styles.contentContainer}>{children}</Box>
    </Dialog>
  );
};

interface TitleProps {
  children: ReactNode;
}

StatusMessageDialog.Title = ({ children }: TitleProps) => {
  return (
    <Typography variant="h4" sx={styles.title}>
      {children}
    </Typography>
  );
};

StatusMessageDialog.Divider = () => {
  return <Divider sx={styles.divider} />;
};

interface ContentProps {
  children: ReactNode;
}

StatusMessageDialog.Content = ({ children }: ContentProps) => {
  return (
    <DialogContent>
      <Typography variant="h5">{children}</Typography>
    </DialogContent>
  );
};

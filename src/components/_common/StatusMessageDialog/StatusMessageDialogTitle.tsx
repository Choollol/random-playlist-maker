import { createStyleGroup } from "@/lib/styling/styling";
import { Typography } from "@mui/material";
import { ReactNode } from "react";

const styles = createStyleGroup({
  title: {
    marginBottom: "8px",
  },
});

interface Props {
  children: ReactNode;
}

export const StatusMessageDialogTitle = ({ children }: Props) => {
  return (
    <Typography variant="h4" sx={styles.title}>
      {children}
    </Typography>
  );
};

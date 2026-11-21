import { DialogContent, Typography } from "@mui/material";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const StatusMessageDialogContent = ({ children }: Props) => {
  return (
    <DialogContent>
      <Typography variant="h5">{children}</Typography>
    </DialogContent>
  );
};

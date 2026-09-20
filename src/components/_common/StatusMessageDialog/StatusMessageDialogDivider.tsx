import { createStyleGroup } from "@/lib/styling/styling";
import { Divider } from "@mui/material";

const styles = createStyleGroup({
  divider: {
    margin: "16px 0px",
  },
});

export const StatusMessageDialogDivider = () => {
  return <Divider sx={styles.divider} />;
};

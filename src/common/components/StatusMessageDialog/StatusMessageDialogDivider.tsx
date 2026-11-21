import { Divider } from "@mui/material";

import { createStyleGroup } from "@/common/lib/styling/styling";

const styles = createStyleGroup({
  divider: {
    margin: "16px 0px",
  },
});

export const StatusMessageDialogDivider = () => {
  return <Divider sx={styles.divider} />;
};

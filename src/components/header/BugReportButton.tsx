import { createStyleGroup } from "@/lib/styling/styling";
import { BUG_REPORT_URL } from "@/lib/utils/miscUtils";
import { BugReport } from "@mui/icons-material";
import { IconButton, Link, Popover, Typography } from "@mui/material";
import { useState } from "react";

const styles = createStyleGroup({
  popover: {
    padding: "12px",
    textAlign: "center",
  },
});

const BugReportButton = () => {
  const [doOpenPopver, setDoOpenPopover] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setDoOpenPopover(true);
  };

  const handlePopoverClose = () => {
    setDoOpenPopover(false);
  };

  return (
    <div>
      <IconButton size="large" onClick={handleClick}>
        <BugReport />
      </IconButton>

      <Popover
        open={doOpenPopver}
        onClose={handlePopoverClose}
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        slotProps={{
          paper: {
            sx: styles.popover,
          },
        }}
      >
        <Typography>Something went wrong?</Typography>
        <Link href={BUG_REPORT_URL}>Submit a bug report!</Link>
      </Popover>
    </div>
  );
};

export default BugReportButton;

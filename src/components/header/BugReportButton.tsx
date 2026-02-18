import { createStyleGroup } from "@/lib/styling/styling";
import { BUG_REPORT_URL } from "@/lib/utils/miscUtils";
import { BugReport } from "@mui/icons-material";
import { IconButton, Link, Popover, Tooltip, Typography } from "@mui/material";
import { useState } from "react";

const styles = createStyleGroup({
  popover: {
    padding: "12px",
    textAlign: "center",
  },
});

const BugReportButton = () => {
  return (
    <Tooltip title="Report a bug!">
      <Link href={BUG_REPORT_URL}>
        <IconButton size="large">
          <BugReport />
        </IconButton>
      </Link>
    </Tooltip>
  );
};

export default BugReportButton;

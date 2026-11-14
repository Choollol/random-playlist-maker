"use client";

import { BugReport, GitHub } from "@mui/icons-material";
import { AppBar, Box, Toolbar } from "@mui/material";

import IconLinkButton from "@/common/components/IconLinkButton";
import { createStyleGroup } from "@/common/lib/styling/styling";
import { PRIMARY_HUE } from "@/common/lib/styling/theme";
import { BUG_REPORT_URL, GITHUB_URL } from "@/common/lib/utils/jsUtils";
import HomeLinkButton from "@/features/header/HomeLinkButton";
import ManageAccountButton from "@/features/header/ManageAccountButton";
import { SaveButton } from "@/features/header/SaveButton";

interface Props {
  isSignedIn: boolean;
}

const styles = createStyleGroup({
  header: [
    (theme) => ({
      position: "sticky",
      height: 60,
      backgroundColor: `hsl(${PRIMARY_HUE}, 30%, 90%)`,
      borderBottom: `solid ${theme.palette.common.black} 1px`,
      boxShadow: "none",
    }),
    (theme) =>
      theme.applyStyles("dark", {
        backgroundColor: `hsl(${PRIMARY_HUE}, 40%, 7%)`,
        borderBottom: `solid ${theme.palette.common.white} 1px`,
      }),
  ],
  toolbar: {
    paddingLeft: 1,
    paddingRight: 1,
  },
  centerSpace: {
    flexGrow: 1,
  },
});

const Header = ({ isSignedIn }: Props) => {
  return (
    <AppBar sx={styles.header}>
      <Toolbar sx={styles.toolbar} disableGutters>
        <HomeLinkButton />

        <Box sx={styles.centerSpace} />

        <SaveButton />
        <IconLinkButton
          tooltipText="Check out the source code!"
          linkHref={GITHUB_URL}
          iconComponent={<GitHub />}
        />
        <IconLinkButton
          tooltipText="Report a bug!"
          linkHref={BUG_REPORT_URL}
          iconComponent={<BugReport />}
        />
        <ManageAccountButton isSignedIn={isSignedIn} />
      </Toolbar>
    </AppBar>
  );
};

export default Header;

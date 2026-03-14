import HomeLinkButton from "@/components/header/HomeLinkButton";
import IconLinkButton from "@/components/IconLinkButton";
import ManageAccountButton from "@/components/ManageAccountButton";
import { createStyleGroup } from "@/lib/styling/styling";
import { BUG_REPORT_URL, GITHUB_URL } from "@/lib/utils/miscUtils";
import { BugReport, GitHub } from "@mui/icons-material";
import { AppBar, Box, Toolbar } from "@mui/material";

interface Props {
  isSignedIn: boolean;
}

const styles = createStyleGroup({
  header: {
    position: "sticky",
    height: 60,
  },
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

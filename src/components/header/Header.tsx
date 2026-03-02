import BugReportButton from "@/components/header/BugReportButton";
import HomeLinkButton from "@/components/header/HomeLinkButton";
import ManageAccountButton from "@/components/ManageAccountButton";
import { createStyleGroup } from "@/lib/styling/styling";
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

        <BugReportButton />
        <ManageAccountButton isSignedIn={isSignedIn} />
      </Toolbar>
    </AppBar>
  );
};

export default Header;

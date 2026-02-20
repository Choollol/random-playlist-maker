import BugReportButton from "@/components/header/BugReportButton";
import HomeLinkButton from "@/components/header/HomeLinkButton";
import ManageAccountButton from "@/components/ManageAccountButton";
import { createStyleGroup } from "@/lib/styling/styling";
import { AppBar, Box, Toolbar } from "@mui/material";

const styles = createStyleGroup({
  header: {
    position: "sticky",
    height: 60,
  },
  toolbar: {
    paddingLeft: "10px",
    paddingRight: "10px",
  },
  centerSpace: {
    flexGrow: 1,
  },
});

const Header = () => {
  return (
    <AppBar sx={styles.header}>
      <Toolbar sx={styles.toolbar} disableGutters>
        <HomeLinkButton />

        <Box sx={styles.centerSpace} />

        <BugReportButton />
        <ManageAccountButton />
      </Toolbar>
    </AppBar>
  );
};

export default Header;

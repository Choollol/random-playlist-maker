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
  centerSpace: {
    flexGrow: 1,
  },
});

const Header = () => {
  return (
    <AppBar sx={styles.header}>
      <Toolbar>
        <HomeLinkButton />

        <Box sx={styles.centerSpace} />

        <BugReportButton />
        <ManageAccountButton />
      </Toolbar>
    </AppBar>
  );
};

export default Header;

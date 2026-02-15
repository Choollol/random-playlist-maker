import UserProfilePicture from "@/components/UserProfilePicture";
import { authClient } from "@/lib/authClient";
import { createStyles } from "@/lib/styling/styling";
import { Logout } from "@mui/icons-material";
import {
  IconButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Popover,
} from "@mui/material";
import { useState } from "react";

const styles = createStyles({
  popover: {
    padding: "4px",
  },
});

/**
 * Shown when user _is_ signed in.
 */
const UserProfileButton = () => {
  const [doOpenPopver, setDoOpenPopover] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleAnchorButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    setAnchorEl(event.currentTarget);
    setDoOpenPopover(true);
  };

  const handlePopoverClose = () => {
    setDoOpenPopover(false);
  };

  const handleSignOutClick = () => {
    authClient.signOut();
  };

  return (
    <>
      <IconButton onClick={handleAnchorButtonClick}>
        <UserProfilePicture />
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
        <MenuItem onClick={handleSignOutClick}>
          <ListItemIcon>
            <Logout />
          </ListItemIcon>
          <ListItemText>Sign Out</ListItemText>
        </MenuItem>
      </Popover>
    </>
  );
};

export default UserProfileButton;

import UserProfilePicture from "@/components/UserProfilePicture";
import { authClient } from "@/lib/authClient";
import { Button } from "@mui/material";

/**
 * Shown when user _is_ signed in.
 */
const UserProfileButton = () => {
  const handleClick = () => {
    authClient.signOut();
  };
  return (
    <Button onClick={handleClick}>
      <UserProfilePicture />
    </Button>
  );
};

export default UserProfileButton;

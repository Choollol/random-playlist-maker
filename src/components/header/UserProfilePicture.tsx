import { AccountCircle } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import Image from "next/image";

import useAuthUserData from "@/hooks/useAuthUserData";
import { createStyleGroup } from "@/lib/styling/styling";
import { isDefined } from "@/lib/utils/typeUtils";

const styles = createStyleGroup({
  avatar: {
    width: 32,
    height: 32,
  },
});

const UserProfilePicture = () => {
  const userData = useAuthUserData();

  return isDefined(userData?.image) ? (
    <Avatar sx={styles.avatar}>
      <Image src={userData.image} alt="User's profile picture" fill />
    </Avatar>
  ) : (
    <AccountCircle />
  );
};

export default UserProfilePicture;

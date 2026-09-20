import useAuthUserData from "@/hooks/useAuthUserData";
import { isDefined } from "@/lib/utils/typeUtils";
import Image from "next/image";
import { AccountCircle } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import { createStyleGroup } from "@/lib/styling/styling";

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

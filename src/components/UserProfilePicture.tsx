import useAuthUserData from "@/hooks/useAuthUserData";
import { isDefined } from "@/lib/utils/typeUtils";
import Image from "next/image";
import { AccountCircle } from "@mui/icons-material";

const IMAGE_WIDTH = 32;

const UserProfilePicture = () => {
  const userData = useAuthUserData();

  return isDefined(userData?.image) ? (
    <Image
      src={userData.image}
      alt="User's profile picture"
      width={IMAGE_WIDTH}
      height={IMAGE_WIDTH}
      style={{ borderRadius: "100%" }}
    />
  ) : (
    <AccountCircle />
  );
};

export default UserProfilePicture;

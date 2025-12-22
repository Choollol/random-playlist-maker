import useAuthUserData from "@/hooks/useAuthUserData";
import { isDefined } from "@/lib/utils/typeUtils";
import Image from "next/image";

const UserProfilePicture = () => {
  const userData = useAuthUserData();

  return isDefined(userData?.image) ? (
    <Image src={userData.image} alt="User's profile picture" fill={true} />
  ) : (
    <div>hi</div>
  );
};

export default UserProfilePicture;

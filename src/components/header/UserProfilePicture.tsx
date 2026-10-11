import { AccountCircle } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import Image from "next/image";

import { createStyleGroup } from "@/lib/styling/styling";
import { isDefined } from "@/lib/utils/typeUtils";
import { useSessionStore } from "@/store/useSessionStore";

const styles = createStyleGroup({
  avatar: {
    width: 32,
    height: 32,
  },
});

const UserProfilePicture = () => {
  const session = useSessionStore((state) => state.session);

  const avatar = session?.user.image;

  return isDefined(avatar) ? (
    <Avatar sx={styles.avatar}>
      <Image src={avatar} alt="User's profile picture" fill />
    </Avatar>
  ) : (
    <AccountCircle />
  );
};

export default UserProfilePicture;

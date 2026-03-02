import SignInButton from "@/components/SignInButton";
import UserProfileButton from "@/components/UserProfileButton";

interface Props {
  isSignedIn: boolean;
}

/**
 * Wrapper around account buttons that changes with signed-in status.
 */
const ManageAccountButton = ({ isSignedIn }: Props) => {
  "use no memo";

  return isSignedIn ? <UserProfileButton /> : <SignInButton />;
};

export default ManageAccountButton;

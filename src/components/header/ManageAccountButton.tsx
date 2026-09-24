import UserProfileMenu from "@/components/header/UserProfileMenu";
import SignInButton from "@/components/SignInButton";

interface Props {
  isSignedIn: boolean;
}

/**
 * Wrapper around account buttons that changes with signed-in status.
 */
const ManageAccountButton = ({ isSignedIn }: Props) => {
  return isSignedIn ? <UserProfileMenu /> : <SignInButton />;
};

export default ManageAccountButton;

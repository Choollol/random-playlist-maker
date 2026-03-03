import SignInButton from "@/components/SignInButton";
import UserProfileMenu from "@/components/UserProfileMenu";

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

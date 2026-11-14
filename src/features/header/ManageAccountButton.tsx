import SignInButton from "@/common/components/SignInButton";
import UserProfileMenu from "@/features/header/UserProfileMenu";

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

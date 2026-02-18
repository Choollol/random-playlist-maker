import SignInButton from "@/components/SignInButton";
import UserProfileButton from "@/components/UserProfileButton";
import useisSignedIn from "@/hooks/useIsSignedIn";

/**
 * Wrapper around account buttons that changes with signed-in status.
 */
const ManageAccountButton = () => {
  "use no memo";
  const isSignedIn = useisSignedIn();

  return isSignedIn ? <UserProfileButton /> : <SignInButton />;
};

export default ManageAccountButton;

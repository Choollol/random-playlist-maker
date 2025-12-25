import { signInGoogle } from "@/lib/authClient";
import { Button } from "@mui/material";

/**
 * Shown when user is _not_ signed in.
 */
const GoogleSignInButton = () => {
  return <Button onClick={signInGoogle}>Log in</Button>;
};

export default GoogleSignInButton;

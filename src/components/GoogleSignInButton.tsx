import { signInGoogle } from "@/lib/authClient";
import { Button } from "@mui/material";

/**
 * Shown when user is _not_ signed in.
 */
const GoogleSignInButton = () => {
  console.log("signin");
  return <Button onClick={signInGoogle}>Log in</Button>;
};

export default GoogleSignInButton;

import { signInGoogle } from "@/lib/authClient";
import { Button, Typography } from "@mui/material";

/**
 * Shown when user is _not_ signed in.
 */
const GoogleSignInButton = () => {
  return (
    <Button onClick={signInGoogle}>
      <Typography variant="h6">Sign in</Typography>
    </Button>
  );
};

export default GoogleSignInButton;

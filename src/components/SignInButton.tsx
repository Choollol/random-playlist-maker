import { signInGoogle } from "@/lib/authClient";
import { Button, Tooltip, Typography } from "@mui/material";

/**
 * Shown when user is _not_ signed in.
 */
const SignInButton = () => {
  return (
    <Tooltip title="Sign in with Google">
      <Button onClick={signInGoogle}>
        <Typography variant="h6">Sign in</Typography>
      </Button>
    </Tooltip>
  );
};

export default SignInButton;

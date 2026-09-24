"use client";

import { Button, Tooltip, Typography } from "@mui/material";
import { useState } from "react";

import { signInGoogle } from "@/lib/authClient";

/**
 * Shown when user is _not_ signed in.
 */
const SignInButton = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);
    signInGoogle();
  };

  return (
    <Tooltip title="Sign in with Google">
      <Button onClick={handleClick} loading={isLoading}>
        <Typography variant="h6">Sign in</Typography>
      </Button>
    </Tooltip>
  );
};

export default SignInButton;

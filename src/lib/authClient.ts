import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({});

export const signInGoogle = async () => {
  const data = await authClient.signIn.social({
    provider: "google",
  });
  console.log(data);
};

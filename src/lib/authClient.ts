import { createAuthClient } from "better-auth/react";

import { signOutOfDatabase } from "@/lib/dbClient";

export const authClient = createAuthClient({});

export const signInGoogle = () => {
  authClient.signIn.social({
    provider: "google",
  });
};

export const signOutGoogle = async () => {
  await authClient.signOut();
  await signOutOfDatabase();
};

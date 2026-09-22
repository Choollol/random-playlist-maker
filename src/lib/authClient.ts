import { signOutOfDatabase } from "@/lib/db";
import { createAuthClient } from "better-auth/react";

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

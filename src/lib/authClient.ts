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

export async function getAccessToken() {
  const { data, error } = await authClient.getAccessToken({
    useAccountCookie: true,
  });
  if (!data || error) {
    throw error;
  }
  return data;
}

export async function refreshAccessToken() {
  return authClient.refreshToken({ useAccountCookie: true });
}

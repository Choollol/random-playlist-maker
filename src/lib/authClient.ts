import { nextCookies } from "better-auth/next-js";
import { createAuthClient } from "better-auth/react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

import { signOutOfDatabase } from "@/lib/dbClient";
import { useSessionStore } from "@/store/useSessionStore";

export const authClient = createAuthClient({
  plugins: [nextCookies()],
});

export const signInGoogle = () => {
  authClient.signIn.social({
    provider: "google",
  });
};

export const signOutGoogle = async (router: AppRouterInstance) => {
  await authClient.signOut();
  await signOutOfDatabase();
  router.refresh();
  useSessionStore.getState().clearSession();
};

export const useSession = authClient.useSession;

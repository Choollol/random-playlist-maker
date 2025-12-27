import { GOOGLE_SCOPES } from "@/lib/utils/gapiUtils";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({});

export const signInGoogle = () => {
  authClient.signIn.social({
    provider: "google",
    scopes: [GOOGLE_SCOPES],
  });
};

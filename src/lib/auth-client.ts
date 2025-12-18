import { ENV } from "@/env";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: ENV.BETTER_AUTH_URL,
});

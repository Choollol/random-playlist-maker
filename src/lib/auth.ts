import { ENV } from "@/env";
import { betterAuth } from "better-auth";

export const auth = betterAuth({
  baseURL: ENV.BETTER_AUTH_URL,
  socialProviders: {
    google: {
      clientId: ENV.GOOGLE_CLIENT_ID,
      clientSecret: ENV.GOOGLE_CLIENT_SECRET,
    },
  },
  onAPIError: {
    errorURL: "/auth-error",
  },
});

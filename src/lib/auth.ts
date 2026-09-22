import { ENV } from "@/env";
import { betterAuth } from "better-auth";

export const auth = betterAuth({
  baseURL: ENV.BETTER_AUTH_URL,
  socialProviders: {
    google: {
      clientId: ENV.GOOGLE_CLIENT_ID,
      clientSecret: ENV.GOOGLE_CLIENT_SECRET,
      scope: [
        "https://www.googleapis.com/auth/youtube",
        "openid",
        "profile",
        "email",
      ],
    },
  },
  onAPIError: {
    errorURL: "/error/auth",
  },
});

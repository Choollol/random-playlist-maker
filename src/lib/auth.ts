import { ENV } from "@/env";
import { betterAuth } from "better-auth";

export const auth = betterAuth({
  socialProviders: {
    google: {
      clientId: ENV.GOOGLE_CLIENT_ID as string,
      clientSecret: ENV.GOOGLE_CLIENT_SECRET as string,
    },
  },
});

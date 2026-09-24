"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function fetchUserData() {
  const requestHeaders = await headers();
  const userData = await auth.api.getSession({ headers: requestHeaders });
  return userData;
}

export async function fetchAccessToken() {
  const response = await auth.api.getAccessToken({
    headers: await headers(),
    body: {
      useAccountCookie: true,
    },
  });
  return response;
}

"use server";

import { headers } from "next/headers";

import { auth } from "@/lib/auth";

export async function fetchUserData() {
  const requestHeaders = await headers();
  const userData = await auth.api.getSession({ headers: requestHeaders });
  return userData;
}

import { authClient } from "@/lib/authClient";
import { AuthSession } from "@/lib/types/authTypes";

export type UserId = string;

export async function isUserSignedIn(): Promise<boolean> {
  const session = await authClient.getSession();
  return isSessionValid(session);
}

export function isSessionValid(session: AuthSession) {
  return session.data !== null;
}

export async function getUserId(): Promise<UserId> {
  return (await authClient.getSession()).data!.user.email!;
}

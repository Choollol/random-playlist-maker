import { authClient } from "@/lib/authClient";
import { AuthSession } from "@/lib/types/authTypes";

export async function isUserSignedIn(): Promise<boolean> {
  const session = await authClient.getSession();
  return isSessionValid(session);
}

export function isSessionValid(session: AuthSession) {
  return session.data !== null;
}

export async function getUserId() {
  return (await authClient.getSession()).data!.user.id.toString();
}

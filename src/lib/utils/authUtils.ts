import { authClient } from "@/lib/authClient";
import { AuthSession } from "@/lib/types/authTypes";

export const isUserSignedIn = async (): Promise<boolean> => {
  const session = await authClient.getSession();
  return isSessionValid(session);
};

export const isSessionValid = (session: AuthSession) => {
  return session.data !== null;
};

import { authClient } from "@/lib/auth-client";

/**
 * @returns Whether the user is logged in and authenticated.
 */
const useIsSignedIn = (): boolean => {
  const session = authClient.useSession();
  return session.data !== null;
};

export default useIsSignedIn;

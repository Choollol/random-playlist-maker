import { authClient } from "@/lib/authClient";
import { isSessionValid } from "@/lib/utils/authUtils";

/**
 * @returns Whether the user is logged in and authenticated.
 */
function useIsSignedIn(): boolean {
  const session = authClient.useSession();
  return isSessionValid(session);
}

export default useIsSignedIn;

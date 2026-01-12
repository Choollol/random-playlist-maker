import { authClient } from "@/lib/authClient";

/**
 * @returns The logged-in user's data.
 */
function useAuthUserData() {
  const session = authClient.useSession();
  return session.data?.user;
}

export default useAuthUserData;

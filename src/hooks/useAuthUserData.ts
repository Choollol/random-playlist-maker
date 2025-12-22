import { authClient } from "@/lib/authClient";

/**
 * @returns The logged-in user's data.
 */
const useAuthUserData = () => {
  const session = authClient.useSession();
  return session.data?.user;
};

export default useAuthUserData;

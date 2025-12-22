import { authClient } from "@/lib/auth-client";

/**
 * @returns Whether the user is logged in and authenticated.
 */
const isLoggedIn = () => {
  const session = authClient.useSession();
  return session.data !== null;
};

export default isLoggedIn;

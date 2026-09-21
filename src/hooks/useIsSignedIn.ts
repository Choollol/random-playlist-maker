import useAuthUserData from "@/hooks/useAuthUserData";

/**
 * @returns A boolean indicating whether a user is currently signed in
 */
export function useIsSignedIn() {
  const userData = useAuthUserData();
  return Boolean(userData);
}

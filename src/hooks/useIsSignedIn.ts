import { useSessionStore } from "@/store/useSessionStore";

/**
 * @returns A boolean indicating whether a user is currently signed in
 */
export function useIsSignedIn() {
  const session = useSessionStore((state) => state.session);
  return Boolean(session);
}

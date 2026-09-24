import { useRouter } from "next/navigation";
import { useEffect } from "react";

import useOnMount from "@/hooks/useOnMount";
import { signOutGoogle } from "@/lib/authClient";
import { fetchUserData } from "@/lib/authServerActions";
import { signInToDatabase } from "@/lib/db";
import { showError } from "@/lib/error";
import { initGapiClient } from "@/lib/gapi";
import { initLocalCache } from "@/lib/localCache";
import { useInitializationStateStore } from "@/store/useInitializationStateStore";
import { useUserPreferencesStore } from "@/store/useUserPreferencesStore";

interface Props {
  isGapiLoaded: boolean;
}

const Initializer = ({ isGapiLoaded }: Props) => {
  const router = useRouter();

  const {
    isGapiInitialized,
    isLocalCacheInitialized,
    isDatabaseInitialized,
    markEverythingInitialized,
    markGapiInitialized,
    markLocalCacheInitialized,
    markDatabaseInitialized,
  } = useInitializationStateStore();

  const loadUserPreferences = useUserPreferencesStore((state) => state.loadUserPreferences);

  useEffect(() => {
    if (isGapiLoaded) {
      (async function () {
        const success = await initGapiClient();
        if (success) {
          markGapiInitialized();
        } else {
          await signOutGoogle();
          router.refresh();
        }
      })();
    }
  }, [isGapiLoaded, markGapiInitialized, router]);

  useEffect(() => {
    (async () => {
      const success = await initLocalCache();
      if (success) {
        markLocalCacheInitialized();
      }
    })();
  }, [markLocalCacheInitialized]);

  useOnMount(() => {
    (async () => {
      try {
        const userData = await fetchUserData();
        if (!userData) {
          throw new Error("User is not signed in");
        }
        await signInToDatabase(userData.user.email);

        await loadUserPreferences();
        markDatabaseInitialized();
      } catch (error) {
        showError({
          type: "recoverable",
          message: `We ran into an error while setting up your preferences: ${error}`,
          error,
        });
      }
    })();
  });

  useEffect(() => {
    if (isGapiInitialized && isLocalCacheInitialized && isDatabaseInitialized) {
      markEverythingInitialized();
    }
  }, [
    isGapiInitialized,
    isLocalCacheInitialized,
    isDatabaseInitialized,
    markEverythingInitialized,
  ]);

  return null;
};
export default Initializer;

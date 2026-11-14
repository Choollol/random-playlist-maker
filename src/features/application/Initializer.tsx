import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { signOutGoogle } from "@/common/lib/auth/authClient";
import { fetchUserData } from "@/common/lib/auth/authServerActions";
import { getUserIdFromData } from "@/common/lib/auth/authUtils";
import { signInToDatabase } from "@/common/lib/db/dbClient";
import { showError } from "@/common/lib/error";
import { initGapiClient } from "@/common/lib/gapi";
import { initLocalCache } from "@/common/lib/localCache";
import { useInitializationStateStore } from "@/common/store/useInitializationStateStore";
import { useUserPreferencesStore } from "@/features/user-preferences/useUserPreferencesStore";

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
          await signOutGoogle(router);
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

  useEffect(() => {
    (async () => {
      try {
        const userData = await fetchUserData();
        if (!userData) {
          throw new Error("User is not signed in");
        }

        const userId = getUserIdFromData(userData);
        await signInToDatabase(userId);

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
  }, [loadUserPreferences, markDatabaseInitialized]);

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

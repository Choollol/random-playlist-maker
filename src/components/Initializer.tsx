import { signOutGoogle } from "@/lib/authClient";
import { signInToDatabase, initDatabase } from "@/lib/db";
import { showError } from "@/lib/error";
import { initLocalCache } from "@/lib/localCache";
import { initGapiClient } from "@/lib/gapi";
import { useInitializationStateStore } from "@/store/useInitializationStateStore";
import { useUserPreferencesStore } from "@/store/useUserPreferencesStore";
import { useRouter } from "next/navigation";
import { useEffect, useEffectEvent } from "react";
import { fetchUserData } from "@/lib/authServerActions";

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

  const loadUserPreferences = useUserPreferencesStore(
    (state) => state.loadUserPreferences,
  );

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

  const handleDatabaseinitSuccess = useEffectEvent(async () => {
    try {
      const userData = await fetchUserData();
      if (!userData) {
        throw new Error("User is not signed in");
      }
      await signInToDatabase(userData.user.id);

      await loadUserPreferences();
      markDatabaseInitialized();
    } catch (error) {
      showError({
        type: "recoverable",
        message: `We ran into an error while setting up your preferences: ${error}`,
        error,
      });
    }
  });

  useEffect(() => {
    (async () => {
      try {
        await initDatabase();
        await handleDatabaseinitSuccess();
      } catch (error) {
        showError({
          type: "recoverable",
          message:
            "Failed to connect with database. User preferences may be unavailable.",
          error,
        });
      }
    })();
  }, [markDatabaseInitialized, loadUserPreferences]);

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

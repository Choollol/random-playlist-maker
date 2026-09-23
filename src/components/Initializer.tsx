import { signOutGoogle } from "@/lib/authClient";
import { signInToDatabase, initDatabase } from "@/lib/db";
import { showError } from "@/lib/error";
import { initLocalCache } from "@/lib/localCache";
import { initGapiClient } from "@/lib/gapi";
import { useInitializationStateStore } from "@/store/useInitializationStateStore";
import { useUserPreferencesStore } from "@/store/useUserPreferencesStore";
import { useRouter } from "next/navigation";
import { useEffect, useEffectEvent } from "react";

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
      await signInToDatabase();
    } catch (error) {
      showError({
        type: "recoverable",
        message: `We ran into an error while setting up your preferences: ${error}`,
        error,
      });
    }

    await loadUserPreferences();
    markDatabaseInitialized();
  });

  useEffect(() => {
    (async () => {
      const initSuccess = await initDatabase();
      if (initSuccess) {
        await handleDatabaseinitSuccess();
      } else {
        showError({
          type: "recoverable",
          message:
            "Failed to connect with database. User preferences may be unavailable.",
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

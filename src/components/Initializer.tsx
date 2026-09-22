import { signOutGoogle } from "@/lib/authClient";
import { initDatabase } from "@/lib/db";
import { showError } from "@/lib/error";
import { initLocalCache } from "@/lib/localCache";
import { initGapiClient } from "@/lib/utils/gapiUtils";
import { useInitializationStateStore } from "@/store/useInitializationStateStore";
import { useUserPreferencesStore } from "@/store/useUserPreferencesStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

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

  useEffect(() => {
    (async () => {
      const initSuccess = await initDatabase();
      if (initSuccess) {
        await loadUserPreferences();
        markDatabaseInitialized();
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

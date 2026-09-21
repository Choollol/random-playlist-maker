import { authClient } from "@/lib/authClient";
import { initLocalCache } from "@/lib/localCache";
import { initGapiClient } from "@/lib/utils/gapiUtils";
import { useInitializationStateStore } from "@/store/useInitializationStateStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";

interface Props {
  isGapiLoaded: boolean;
}

const Initializer = ({ isGapiLoaded }: Props) => {
  const router = useRouter();

  const {
    isGapiInitialized,
    isLocalCacheInitialized,
    markGapiInitialized,
    markLocalCacheInitialized,
    markEverythingInitialized,
  } = useInitializationStateStore(
    useShallow((state) => ({
      isGapiInitialized: state.isGapiInitialized,
      isLocalCacheInitialized: state.isLocalCacheInitialized,
      markGapiInitialized: state.markGapiInitialized,
      markLocalCacheInitialized: state.markLocalCacheInitialized,
      markEverythingInitialized: state.markEverythingInitialized,
    })),
  );

  useEffect(() => {
    if (isGapiLoaded) {
      (async function () {
        const success = await initGapiClient();
        if (success) {
          markGapiInitialized();
        } else {
          await authClient.signOut();
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
    if (isGapiInitialized && isLocalCacheInitialized) {
      markEverythingInitialized();
    }
  }, [isGapiInitialized, isLocalCacheInitialized, markEverythingInitialized]);

  return null;
};
export default Initializer;

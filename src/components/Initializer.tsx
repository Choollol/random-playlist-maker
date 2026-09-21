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
    setGapiInitialized,
    setLocalCacheInitialized,
    setEverythingInitialized,
  } = useInitializationStateStore(
    useShallow((state) => ({
      isGapiInitialized: state.isGapiInitialized,
      isLocalCacheInitialized: state.isLocalCacheInitialized,
      setGapiInitialized: state.setGapiInitialized,
      setLocalCacheInitialized: state.setLocalCacheInitialized,
      setEverythingInitialized: state.setEverythingInitialized,
    })),
  );

  useEffect(() => {
    if (isGapiLoaded) {
      (async function () {
        const success = await initGapiClient();
        if (success) {
          setGapiInitialized();
        } else {
          await authClient.signOut();
          router.refresh();
        }
      })();
    }
  }, [isGapiLoaded, setGapiInitialized, router]);

  useEffect(() => {
    (async () => {
      const success = await initLocalCache();
      if (success) {
        setLocalCacheInitialized();
      }
    })();
  }, [setLocalCacheInitialized]);

  useEffect(() => {
    if (isGapiInitialized && isLocalCacheInitialized) {
      setEverythingInitialized();
    }
  }, [isGapiInitialized, isLocalCacheInitialized, setEverythingInitialized]);

  return null;
};
export default Initializer;

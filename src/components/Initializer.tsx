import { authClient } from "@/lib/authClient";
import { initDB } from "@/lib/db";
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
    isDatabaseInitialized,
    setGapiInitialized,
    setDatabaseInitialized,
    setEverythingInitialized,
  } = useInitializationStateStore(
    useShallow((state) => ({
      isGapiInitialized: state.isGapiInitialized,
      isDatabaseInitialized: state.isDatabaseInitialized,
      setGapiInitialized: state.setGapiInitialized,
      setDatabaseInitialized: state.setDatabaseInitialized,
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
      const success = await initDB();
      if (success) {
        setDatabaseInitialized();
      }
    })();
  }, [setDatabaseInitialized]);

  useEffect(() => {
    if (isGapiInitialized && isDatabaseInitialized) {
      setEverythingInitialized();
    }
  }, [isGapiInitialized, isDatabaseInitialized, setEverythingInitialized]);

  return null;
};
export default Initializer;

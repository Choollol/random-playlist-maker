import { initDB } from "@/lib/db";
import { initGapiClient } from "@/lib/utils/gapiUtils";
import { useInitializationStateStore } from "@/store/useInitializationStateStore";
import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";

interface Props {
  isGapiLoaded: boolean;
}

const Initializer = ({ isGapiLoaded }: Props) => {
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
        }
      })();
    }
  }, [isGapiLoaded, setGapiInitialized]);

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

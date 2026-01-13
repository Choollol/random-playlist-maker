import { initDB } from "@/lib/db";
import { useInitializationStateStore } from "@/store/useInitializationStateStore";
import { useEffect } from "react";

const Initializer = () => {
  const {
    isGapiInitialized,
    isDatabaseInitialized,
    setDatabaseInitialized,
    setEverythingInitialized,
  } = useInitializationStateStore((state) => state);

  useEffect(() => {
    (async () => {
      await initDB();
      setDatabaseInitialized();
    })();
  }, [setDatabaseInitialized]);

  useEffect(() => {
    if (isGapiInitialized && isDatabaseInitialized) {
      setEverythingInitialized();
    }
  }, [isGapiInitialized, isDatabaseInitialized, setEverythingInitialized]);

  return <></>;
};
export default Initializer;

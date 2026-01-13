import { initDB } from "@/lib/db";
import { useInitializationStateStore } from "@/store/useInitializationStateStore";
import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";

const Initializer = () => {
  const {
    isGapiInitialized,
    isDatabaseInitialized,
    setDatabaseInitialized,
    setEverythingInitialized,
  } = useInitializationStateStore(
    useShallow((state) => ({
      isGapiInitialized: state.isGapiInitialized,
      isDatabaseInitialized: state.isDatabaseInitialized,
      setDatabaseInitialized: state.setDatabaseInitialized,
      setEverythingInitialized: state.setEverythingInitialized,
    }))
  );

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

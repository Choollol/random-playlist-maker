import useIsSignedIn from "@/hooks/useIsSignedIn";
import { initDB } from "@/lib/db";
import { initGapiClient } from "@/lib/utils/gapiUtils";
import { useInitializationStateStore } from "@/store/useInitializationStateStore";
import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";

interface Props {
  isGapiLoaded: boolean;
}

const Initializer = ({ isGapiLoaded }: Props) => {
  const isSignedIn = useIsSignedIn();

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
    }))
  );

  useEffect(() => {
    if (isSignedIn && isGapiLoaded) {
      (async function () {
        await initGapiClient();
        setGapiInitialized();
      })();
    }
  }, [isSignedIn, isGapiLoaded, setGapiInitialized]);

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

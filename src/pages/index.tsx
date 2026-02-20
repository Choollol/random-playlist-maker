import { ENV } from "@/env";
import TestButton from "@/components/TestButton";
import { useEffect } from "react";
import { setEnvVariables } from "@/lib/utils/envUtils";
import useIsSignedIn from "@/hooks/useIsSignedIn";
import SignedInDisplay from "@/components/SignedInDisplay";
import SignedOutDisplay from "@/components/SignedOutDisplay";
import Header from "@/components/header/Header";

interface Props {
  googleApiKey: string;
  googleClientId: string;
}

export default function Home({ googleApiKey, googleClientId }: Props) {
  const isSignedIn = useIsSignedIn();

  useEffect(
    () => {
      setEnvVariables(googleApiKey, googleClientId);
    },
    // Dependencies should never change
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return (
    <>
      <div>
        <Header />

        <main>
          {isSignedIn ? <SignedInDisplay /> : <SignedOutDisplay />}
          {/* <TestButton /> */}
        </main>
      </div>
    </>
  );
}

export const getStaticProps = async (): Promise<{ props: Props }> => {
  return {
    props: {
      googleApiKey: ENV.GOOGLE_API_KEY,
      googleClientId: ENV.GOOGLE_CLIENT_ID,
    },
  };
};

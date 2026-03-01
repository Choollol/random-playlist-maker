"use client";

import { useState } from "react";
import useIsSignedIn from "@/hooks/useIsSignedIn";
import SignedInDisplay from "@/components/SignedInDisplay";
import SignedOutDisplay from "@/components/SignedOutDisplay";
import Header from "@/components/header/Header";
import Script from "next/script";
import Initializer from "@/components/Initializer";

export default function Home() {
  const isSignedIn = useIsSignedIn();

  const [isGapiLoaded, setIsGapiLoaded] = useState(false);

  const handleGapiLoad = () => {
    gapi.load("client", () => {
      setIsGapiLoaded(true);
    });
  };

  return (
    <>
      <Script src="https://apis.google.com/js/api.js" onLoad={handleGapiLoad} />

      <Initializer isGapiLoaded={isGapiLoaded} />

      <Header />

      <main>{isSignedIn ? <SignedInDisplay /> : <SignedOutDisplay />}</main>
    </>
  );
}

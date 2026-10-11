import Header from "@/components/header/Header";
import SignedInDisplay from "@/components/SignedInDisplay";
import SignedOutDisplay from "@/components/SignedOutDisplay";
import { fetchUserData } from "@/lib/authServerActions";

export default async function Home() {
  const sessionData = await fetchUserData();
  const isSignedIn = !!sessionData?.session;

  return (
    <>
      <Header isSignedIn={isSignedIn} />

      {isSignedIn ? <SignedInDisplay sessionData={sessionData} /> : <SignedOutDisplay />}
    </>
  );
}

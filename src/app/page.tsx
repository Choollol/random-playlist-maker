import { fetchUserData } from "@/common/lib/auth/authServerActions";
import SignedInDisplay from "@/features/application/SignedInDisplay";
import SignedOutDisplay from "@/features/application/SignedOutDisplay";
import Header from "@/features/header/Header";

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

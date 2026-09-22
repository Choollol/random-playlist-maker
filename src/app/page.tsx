import SignedInDisplay from "@/components/SignedInDisplay";
import SignedOutDisplay from "@/components/SignedOutDisplay";
import Header from "@/components/header/Header";
import { fetchUserData } from "@/lib/authServerActions";

export default async function Home() {
  const data = await fetchUserData();
  const isSignedIn = !!data?.session;

  return (
    <>
      <Header isSignedIn={isSignedIn} />

      {isSignedIn ? <SignedInDisplay /> : <SignedOutDisplay />}
    </>
  );
}

import SignedInDisplay from "@/components/SignedInDisplay";
import SignedOutDisplay from "@/components/SignedOutDisplay";
import Header from "@/components/header/Header";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function Home() {
  const requestHeaders = await headers();
  const data = await auth.api.getSession({ headers: requestHeaders });
  const isSignedIn = !!data?.session;

  return (
    <>
      <Header isSignedIn={isSignedIn} />

      <main>{isSignedIn ? <SignedInDisplay /> : <SignedOutDisplay />}</main>
    </>
  );
}

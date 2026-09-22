"use server";

import { ENV } from "@/env";
import { auth } from "@/lib/auth";
import { FirebaseApp, initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithCredential,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  Firestore,
  getDoc,
  doc,
  setDoc,
} from "firebase/firestore";
import { headers } from "next/headers";

export enum CollectionKey {
  userData = "userData",
}

const firebaseConfig = {
  apiKey: ENV.FIREBASE_API_KEY,
  authDomain: "picksome-db.firebaseapp.com",
  projectId: "picksome-db",
  storageBucket: "picksome-db.firebasestorage.app",
  messagingSenderId: "889182891099",
  appId: "1:889182891099:web:4d18ef911a5a4072e5637e",
};

let app: FirebaseApp;
let db: Firestore;

export async function initDatabase() {
  try {
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    return true;
  } catch {
    return false;
  }
}

/**
 * @throws
 */
export async function saveToDatabase(
  collectionKey: string,
  documentKey: string,
  data: object,
) {
  setDoc(doc(db, collectionKey, documentKey), {
    ...data,
    // This has to match the firestore rule
    userDbUid: getAuth().currentUser!.uid,
  });
}

/**
 * @throws
 */
export async function loadFromDatabase(
  collectionKey: string,
  documentKey: string,
) {
  return getDoc(doc(db, collectionKey, documentKey));
}

export async function signInToDatabase() {
  const response = await auth.api.getAccessToken({
    headers: await headers(),
    body: {
      useAccountCookie: true,
    },
  });
  await signInWithCredential(
    getAuth(),
    GoogleAuthProvider.credential(response.idToken),
  );
}

export async function signOutOfDatabase() {
  await signOut(getAuth());
}

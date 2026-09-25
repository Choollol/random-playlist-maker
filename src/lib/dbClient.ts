"use client";

import { FirebaseApp, getApp, initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signInWithCustomToken, signOut } from "firebase/auth";
import { getFirestore, getDoc, doc, setDoc } from "firebase/firestore";

import { getDbAuthCustomToken, getFirebaseConfig } from "@/lib/dbServer";

export enum CollectionKey {
  userData = "userData",
}

let app: FirebaseApp;

async function getDbApp() {
  if (!app) {
    try {
      app = getApp();
    } catch {
      app = initializeApp(await getFirebaseConfig());
    }
  }
  return app;
}

/**
 * @throws
 */
export async function saveToDatabase(collectionKey: string, documentKey: string, data: object) {
  const app = await getDbApp();
  setDoc(doc(getFirestore(app), collectionKey, documentKey), {
    ...data,
    // This has to match the firestore rule
    userDbUid: getAuth(app).currentUser!.uid,
  });
}

/**
 * @throws
 */
export async function loadFromDatabase(collectionKey: string, documentKey: string) {
  const app = await getDbApp();
  return getDoc(doc(getFirestore(app), collectionKey, documentKey));
}

export async function signInToDatabase(uid: string) {
  const app = await getDbApp();
  const customToken = await getDbAuthCustomToken(uid);
  await signInWithCustomToken(getAuth(app), customToken);
  await new Promise<void>((resolve) => {
    if (getAuth(app).currentUser !== null) {
      resolve();
    }
    const unsubscribe = onAuthStateChanged(getAuth(app), (user) => {
      if (user) {
        unsubscribe();
        resolve();
      }
    });
  });
}

export async function signOutOfDatabase() {
  const app = await getDbApp();
  const auth = getAuth(app);
  if (auth.currentUser === null) {
    return;
  }
  await signOut(auth);
}

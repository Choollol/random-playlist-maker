"use server";

import { initializeApp as initializeAppAdmin, cert } from "firebase-admin";
import { getAuth as getAuthAdmin } from "firebase-admin/auth";
import { getApp, initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signInWithCustomToken, signOut } from "firebase/auth";
import { getFirestore, getDoc, doc, setDoc } from "firebase/firestore";

import { ENV } from "@/env";
import { useInitializationStateStore } from "@/store/useInitializationStateStore";

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

function getDbApp() {
  try {
    initializeAppAdmin({
      credential: cert({
        projectId: ENV.FIREBASE_SERVICE_ACCOUNT_PROJECT_ID,
        clientEmail: ENV.FIREBASE_SERVICE_ACCOUNT_CLIENT_EMAIL,
        privateKey: ENV.FIREBASE_SERVICE_ACCOUNT_PRIVATE_KEY.replaceAll("\\n", "\n"),
      }),
    });
  } catch {
    // App already initialized, do nothing
  }

  try {
    return getApp();
  } catch {
    const app = initializeApp(firebaseConfig);

    onAuthStateChanged(getAuth(app), (user) => {
      if (user) {
        useInitializationStateStore.getState().markDatabaseInitialized();
      }
    });

    return app;
  }
}

/**
 * @throws
 */
export async function saveToDatabase(collectionKey: string, documentKey: string, data: object) {
  const app = getDbApp();
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
  const app = getDbApp();
  return getDoc(doc(getFirestore(app), collectionKey, documentKey));
}

export async function signInToDatabase(uid: string) {
  const app = getDbApp();
  const customToken = await getAuthAdmin().createCustomToken(uid);
  await signInWithCustomToken(getAuth(app), customToken);
}

export async function signOutOfDatabase() {
  const app = getDbApp();
  await signOut(getAuth(app));
}

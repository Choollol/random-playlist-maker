"use server";

import { ENV } from "@/env";
import { FirebaseApp, initializeApp } from "firebase/app";
import { initializeApp as initializeAppAdmin, cert } from "firebase-admin";
import { getAuth as getAuthAdmin } from "firebase-admin/auth";
import { getAuth, signInWithCustomToken, signOut } from "firebase/auth";
import {
  getFirestore,
  Firestore,
  getDoc,
  doc,
  setDoc,
} from "firebase/firestore";

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
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);

  try {
    initializeAppAdmin({
      credential: cert({
        projectId: ENV.FIREBASE_SERVICE_ACCOUNT_PROJECT_ID,
        clientEmail: ENV.FIREBASE_SERVICE_ACCOUNT_CLIENT_EMAIL,
        privateKey: ENV.FIREBASE_SERVICE_ACCOUNT_PRIVATE_KEY.replaceAll(
          "\\n",
          "\n",
        ),
      }),
    });
  } catch {
    // App already initialized, do nothing
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

export async function signInToDatabase(uid: string) {
  const customToken = await getAuthAdmin().createCustomToken(uid);
  await signInWithCustomToken(getAuth(), customToken);
}

export async function signOutOfDatabase() {
  await signOut(getAuth());
}

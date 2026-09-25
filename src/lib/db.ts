"use server";

import {
  initializeApp as initializeAppAdmin,
  cert,
  App,
  getApp as getAppAdmin,
} from "firebase-admin";
import { getAuth as getAuthAdmin } from "firebase-admin/auth";
import { FirebaseApp, getApp, initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signInWithCustomToken, signOut } from "firebase/auth";
import { getFirestore, getDoc, doc, setDoc } from "firebase/firestore";

import { ENV } from "@/env";

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
let appAdmin: App;

function getDbApp() {
  if (!app) {
    try {
      app = getApp();
    } catch {
      app = initializeApp(firebaseConfig);
    }
  }
  return app;
}

function getDbAdminApp() {
  if (!appAdmin) {
    try {
      appAdmin = getAppAdmin();
    } catch {
      initializeAppAdmin({
        credential: cert({
          projectId: ENV.FIREBASE_SERVICE_ACCOUNT_PROJECT_ID,
          clientEmail: ENV.FIREBASE_SERVICE_ACCOUNT_CLIENT_EMAIL,
          privateKey: ENV.FIREBASE_SERVICE_ACCOUNT_PRIVATE_KEY.replaceAll("\\n", "\n"),
        }),
      });
    }
  }

  return appAdmin;
}

/**
 * @throws
 */
export async function saveToDatabase(collectionKey: string, documentKey: string, data: object) {
  const app = getDbApp();
  console.log(">>", app);
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
  const appAdmin = getDbAdminApp();
  const customToken = await getAuthAdmin(appAdmin).createCustomToken(uid);
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
  console.log(">", app);
}

export async function signOutOfDatabase() {
  const app = getDbApp();
  const auth = getAuth(app);
  if (auth.currentUser === null) {
    return;
  }
  await signOut(auth);
}

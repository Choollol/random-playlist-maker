"use server";

import { App, cert, getApp, initializeApp } from "firebase-admin";
import { getAuth } from "firebase-admin/auth";

import { ENV } from "@/env";

const firebaseConfig = {
  apiKey: ENV.FIREBASE_API_KEY,
  authDomain: "picksome-db.firebaseapp.com",
  projectId: "picksome-db",
  storageBucket: "picksome-db.firebasestorage.app",
  messagingSenderId: "889182891099",
  appId: "1:889182891099:web:4d18ef911a5a4072e5637e",
};

let app: App;

function getDbAdminApp() {
  if (!app) {
    try {
      app = getApp();
    } catch {
      initializeApp({
        credential: cert({
          projectId: ENV.FIREBASE_SERVICE_ACCOUNT_PROJECT_ID,
          clientEmail: ENV.FIREBASE_SERVICE_ACCOUNT_CLIENT_EMAIL,
          privateKey: ENV.FIREBASE_SERVICE_ACCOUNT_PRIVATE_KEY.replaceAll("\\n", "\n"),
        }),
      });
    }
  }

  return app;
}

export async function getDbAuthCustomToken(uid: string) {
  const app = getDbAdminApp();
  return await getAuth(app).createCustomToken(uid);
}

export async function getFirebaseConfig() {
  return firebaseConfig;
}

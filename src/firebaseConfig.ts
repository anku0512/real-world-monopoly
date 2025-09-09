// firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { ENV } from "./env";

const firebaseConfig = {
    apiKey: ENV.firebaseApiKey,
    authDomain: ENV.firebaseAuthDomain,
    projectId: ENV.firebaseProjectId,
    storageBucket: ENV.firebaseStorageBucket,
    messagingSenderId: ENV.firebaseMessagingSenderId,
    appId: ENV.firebaseAppId,
    measurementId: ENV.firebaseMeasurementId
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);

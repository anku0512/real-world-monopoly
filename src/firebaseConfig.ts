// firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: replace with your Firebase project config object (from Firebase console settings)
const firebaseConfig = {
    apiKey: "AIzaSyAb3_WSjm8uBp3Rcbwe2gMb2Wps3yxAJB8",
    authDomain: "open-world-monopoly.firebaseapp.com",
    projectId: "open-world-monopoly",
    storageBucket: "open-world-monopoly.firebasestorage.app",
    messagingSenderId: "436506676795",
    appId: "1:436506676795:web:1d0ab900c0ae701ea9161e",
    measurementId: "G-LKFPGFF06Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);

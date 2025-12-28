import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDAMYsVqoJHWTLwCqVxMp1N37Z_qoaBoOg",
  authDomain: "shere-ltd.firebaseapp.com",
  projectId: "shere-ltd",
  storageBucket: "shere-ltd.firebasestorage.app",
  messagingSenderId: "369338251314",
  appId: "1:369338251314:web:2a8df2c5a827d00672a42b",
  measurementId: "G-TS664CZ977",
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
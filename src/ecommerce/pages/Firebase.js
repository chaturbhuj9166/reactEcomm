

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc, onSnapshot as firebaseOnSnapshot } from "firebase/firestore";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDdSg6UgeE0l3y4uRrceZ8Z5sQKRRwmppc",
  authDomain: "e-commerce-ed1a4.firebaseapp.com",
  projectId: "e-commerce-ed1a4",
  storageBucket: "e-commerce-ed1a4.firebasestorage.app",
  messagingSenderId: "166132949508",
  appId: "1:166132949508:web:8072b70f4b38599ebe0b51"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Exports
export const authentication = getAuth(app);
export const db = getFirestore(app);

// Firestore helpers
export { doc, setDoc, getDoc, firebaseOnSnapshot as onSnapshot };


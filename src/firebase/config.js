// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB88nQsT16qfpIAwUxfQgL0IMhB1IrUbHk",
  authDomain: "poofyhair-d45c3.firebaseapp.com",
  projectId: "poofyhair-d45c3",
  storageBucket: "poofyhair-d45c3.firebasestorage.app",
  messagingSenderId: "4748208539",
  appId: "1:4748208539:web:64112612c714a9c925193e",
  measurementId: "G-3JL3RRFRD9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { app, analytics, db };

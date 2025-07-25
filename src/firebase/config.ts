// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBfDMHeiLLQ6LrIhbMV6hOl-VJvDDSB7wc",
  authDomain: "salestracking-9f049.firebaseapp.com",
  projectId: "salestracking-9f049",
  storageBucket: "salestracking-9f049.firebasestorage.app",
  messagingSenderId: "259274804398",
  appId: "1:259274804398:web:36c8a1ef7022c56ef8b13f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Exporting
export { app, auth, db };

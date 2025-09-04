// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDtPd3a1jnRneu_k8CgacFNBSeGP4LkqAY",
  authDomain: "expense-tracker-43af8.firebaseapp.com",
  projectId: "expense-tracker-43af8",
  storageBucket: "expense-tracker-43af8.firebasestorage.app",
  messagingSenderId: "538636873541",
  appId: "1:538636873541:web:7b7f8db6825631c707182c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
export const db = getFirestore(app)
import firebase from "firebase/compat/app";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBr06OwfcQs4Uhtumg973Nf_GBTkLlWZ8s",
  authDomain: "roomlink-d748d.firebaseapp.com",
  databaseURL:
    "https://roomlink-d748d-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "roomlink-d748d",
  storageBucket: "roomlink-d748d.appspot.com",
  messagingSenderId: "168645778255",
  appId: "1:168645778255:web:64ae4de6f3ea3b3987833a",
  measurementId: "G-TXEF4TSNLY",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
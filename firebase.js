// Import the functions you need from the SDKs you need
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export {
  auth,
  app,
  db,
  getFirestore,
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
};

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from 'firebase/storage';
import { getDatabase } from 'firebase/database';
import { getFirestore } from "@firebase/firestore";
import {getAuth} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDAda8jbpjwkdhDvo5KeaM7gj_ZE9DqTCI",
  authDomain: "digital-memory-book.firebaseapp.com",
  databaseURL: "https://digital-memory-book-default-rtdb.firebaseio.com",
  projectId: "digital-memory-book",
  storageBucket: "digital-memory-book.appspot.com",
  messagingSenderId: "298172683131",
  appId: "1:298172683131:web:f9f3673256dc3d496ca3de",
  measurementId: "G-LNMBFHE7S6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
export const auth = getAuth(app);

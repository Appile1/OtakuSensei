import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { getFirestore, setDoc, doc } from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBt4JIcuf1UKaTvTf5R4tayjgKMN-n-e5E",
  authDomain: "stockstash-8cb30.firebaseapp.com",
  projectId: "stockstash-8cb30",
  storageBucket: "stockstash-8cb30.appspot.com",
  messagingSenderId: "283991795271",
  appId: "1:283991795271:web:d550b1c665c44a4195f362",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const GoggleProvider = new GoogleAuthProvider();

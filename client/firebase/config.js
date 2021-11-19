import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, set } from "firebase/database";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBta5woPFxIVcHqiWxdEAqR_9-OIe_Fa-M",
  authDomain: "chat-app-d17db.firebaseapp.com",
  databaseURL:
    "https://chat-app-d17db-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "chat-app-d17db",
  storageBucket: "chat-app-d17db.appspot.com",
  messagingSenderId: "364063539963",
  appId: "1:364063539963:web:604127ec2a1f800d3da65e",
  measurementId: "G-D8FT32E6RW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
getAnalytics(app);
const database = getDatabase(app);
const authentication = getAuth();
export {
  authentication,
  updateProfile,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  database,
  ref,
  set,
  signOut,
};

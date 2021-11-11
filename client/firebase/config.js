import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBta5woPFxIVcHqiWxdEAqR_9-OIe_Fa-M",
  authDomain: "chat-app-d17db.firebaseapp.com",
  projectId: "chat-app-d17db",
  storageBucket: "chat-app-d17db.appspot.com",
  messagingSenderId: "364063539963",
  appId: "1:364063539963:web:604127ec2a1f800d3da65e",
  measurementId: "G-D8FT32E6RW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
getAnalytics(app);
const db = getFirestore();
const authentication = getAuth();
export { db, authentication, createUserWithEmailAndPassword };

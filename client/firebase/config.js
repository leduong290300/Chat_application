import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
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
// Lưu trữ dữ liệu đám mây
const database = getDatabase(app);
// Xác thực người dùng
const authentication = getAuth();
// Lưu ảnh dám mây
const storage = getStorage(app);
getAnalytics(app);
export {
  authentication,
  updateProfile,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  database,
  ref,
  set,
  signOut,
  storage,
};

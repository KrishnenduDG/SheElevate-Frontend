import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC3alkpqtXqZ86Pqes0EoINxUw0QFOX_pw",
  authDomain: "sheelevate-33d85.firebaseapp.com",
  projectId: "sheelevate-33d85",
  storageBucket: "sheelevate-33d85.appspot.com",
  messagingSenderId: "459055640987",
  appId: "1:459055640987:web:53deea6c3066fd821bb13e",
  measurementId: "G-0ZY7BDTZ7Y",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const GAuthProvider = new GoogleAuthProvider(auth);

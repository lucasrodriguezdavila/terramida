import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBgTHqxBnsaUXpwiuy05TWubYPWel-kCI4",
  authDomain: "terramida.firebaseapp.com",
  projectId: "terramida",
  storageBucket: "terramida.appspot.com",
  messagingSenderId: "989938949714",
  appId: "1:989938949714:web:307777e070ab43cfca898b",
  measurementId: "G-70L3864V44",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore();

// Initialize another app
export const appTicket = initializeApp(firebaseConfig, "appTicket");
export const authTicket = getAuth(appTicket);

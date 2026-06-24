import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCS2YFIPn_8I_vd_yaS8_hXKV6rYX3atiE",
  authDomain: "owuexchange-1c82d.firebaseapp.com",
  projectId: "owuexchange-1c82d",
  storageBucket: "owuexchange-1c82d.firebasestorage.app",
  messagingSenderId: "335258305483",
  appId: "1:335258305483:web:ae8ee70bddefe770866c4e",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
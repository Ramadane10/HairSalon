import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC-VKZOTcsMlJx5JuQy8BnOLwFtFswq9UM",
  authDomain: "hairsalonapp-3ee7f.firebaseapp.com",
  projectId: "hairsalonapp-3ee7f",
  storageBucket: "hairsalonapp-3ee7f.appspot.com",
  messagingSenderId: "528691953776",
  appId: "1:528691953776:web:66d544c2dfd179de9174b5"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
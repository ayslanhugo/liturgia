import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database"; 


const firebaseConfig = {
  apiKey: "AIzaSyBWyhORll3M-0IRxi4y8vOI5HH7fUdaBfs",
  authDomain: "liturgia-e152c.firebaseapp.com",
  databaseURL: "https://liturgia-e152c-default-rtdb.firebaseio.com",
  projectId: "liturgia-e152c",
  storageBucket: "liturgia-e152c.firebasestorage.app",
  messagingSenderId: "676735381892",
  appId: "1:676735381892:web:5bc071bee711d4f1126dd1"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

export { auth, db };
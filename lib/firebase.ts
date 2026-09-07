import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAaFfl0iM195MB0zuyDLxmRw10J4ZqSNRk",
  authDomain: "kerala-meal-planner.firebaseapp.com",
  projectId: "kerala-meal-planner",
  storageBucket: "kerala-meal-planner.firebasestorage.app",
  messagingSenderId: "302091293899",
  appId: "1:302091293899:web:56f3fd66a559a2e119b74e"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
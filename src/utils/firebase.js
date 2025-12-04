import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAcBxvE2Vk6fcSOfugZKFr9qSejEafaTJE",
  authDomain: "netflix-gpt-9f895.firebaseapp.com",
  projectId: "netflix-gpt-9f895",
  storageBucket: "netflix-gpt-9f895.firebasestorage.app",
  messagingSenderId: "574675325240",
  appId: "1:574675325240:web:7f9b1083ee9ee8be1931cd",
  measurementId: "G-ESPGX5JN67",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();

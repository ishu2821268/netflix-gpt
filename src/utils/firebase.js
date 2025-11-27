// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAcBxvE2Vk6fcSOfugZKFr9qSejEafaTJE",
  authDomain: "netflix-gpt-9f895.firebaseapp.com",
  projectId: "netflix-gpt-9f895",
  storageBucket: "netflix-gpt-9f895.firebasestorage.app",
  messagingSenderId: "574675325240",
  appId: "1:574675325240:web:7f9b1083ee9ee8be1931cd",
  measurementId: "G-ESPGX5JN67",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

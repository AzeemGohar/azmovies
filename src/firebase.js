// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBf_COcu8RaZLsXIW1cjPhZJKuZ7nve_Rg",
  authDomain: "moviesposters-5e05d.firebaseapp.com",
  projectId: "moviesposters-5e05d",
  storageBucket: "moviesposters-5e05d.appspot.com",
  messagingSenderId: "857392724612",
  appId: "1:857392724612:web:a7d41c61d66129e22520d1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const auth = getAuth(app);
export const db = getFirestore(app);

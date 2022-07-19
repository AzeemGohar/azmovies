// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCY6kxIum0g3cpjeplw2-QuKftnylefYL4",
  authDomain: "fir-firsttime-43207.firebaseapp.com",
  projectId: "fir-firsttime-43207",
  storageBucket: "fir-firsttime-43207.appspot.com",
  messagingSenderId: "494209943534",
  appId: "1:494209943534:web:2c76c5b442c38011b630ff",
  measurementId: "G-GZGFSJWSVF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
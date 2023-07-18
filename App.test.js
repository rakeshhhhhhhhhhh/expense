import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// Import the functions you need from the SDKs you need
// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB99IPSMHctXF02aNshXlZbkyF308phEsA",
  authDomain: "my-accounts-d44a9.firebaseapp.com",
  projectId: "my-accounts-d44a9",
  storageBucket: "my-accounts-d44a9.appspot.com",
  messagingSenderId: "113499294410",
  appId: "1:113499294410:web:0ca8789c754f9c43d18233"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);
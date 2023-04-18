// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCDfTCtZs1J3u_-EXIDA_AGBJEKfvqoiw8",
  authDomain: "noodleai.firebaseapp.com",
  databaseURL: "https://noodleai.firebaseio.com",
  projectId: "noodleai",
  storageBucket: "noodleai.appspot.com",
  messagingSenderId: "1056238622723",
  appId: "1:1056238622723:web:19fbdf6c7af7a642489636"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);


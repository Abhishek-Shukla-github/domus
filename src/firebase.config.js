// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAG4xk-Txdm2PdyQkm6GdNNlJH5UxA-nyI",
    authDomain: "huos-d5729.firebaseapp.com",
    projectId: "huos-d5729",
    storageBucket: "huos-d5729.appspot.com",
    messagingSenderId: "667842536889",
    appId: "1:667842536889:web:fbc7b71d081ba36cf1c268"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();
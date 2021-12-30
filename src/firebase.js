// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC4F4ehTP768Ft-tvn9RgAPictfNJNCbJE",
  authDomain: "anomsg-709fc.firebaseapp.com",
  projectId: "anomsg-709fc",
  storageBucket: "anomsg-709fc.appspot.com",
  messagingSenderId: "955398390566",
  appId: "1:955398390566:web:f70c2ed86d409f06c0f7e7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCGVWfteIioW3DP3suModDti49ZLqpKDhM",
  authDomain: "pbl4-chat-room.firebaseapp.com",
  projectId: "pbl4-chat-room",
  storageBucket: "pbl4-chat-room.appspot.com",
  messagingSenderId: "248369486121",
  appId: "1:248369486121:web:8a645537e3c84f3b1c3f38",
  measurementId: "G-9EF49REQN3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const storage = getStorage(app);
export { app, analytics, db, storage };

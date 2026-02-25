// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyArZ_0q9Sk2M8eXxa-4bbEE_7Ju3Abh84M",
  authDomain: "moodly-c9d2b.firebaseapp.com",
  projectId: "moodly-c9d2b",
  storageBucket: "moodly-c9d2b.appspot.com",
  messagingSenderId: "624091992854",
  appId: "1:624091992854:web:ad1c8581f962e03098b637"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const auth = getAuth(app);
export { app , storage, auth };
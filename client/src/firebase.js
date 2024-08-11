// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-8adaf.firebaseapp.com",
  projectId: "mern-auth-8adaf",
  storageBucket: "mern-auth-8adaf.appspot.com",
  messagingSenderId: "451690194546",
  appId: "1:451690194546:web:ecd4a78287320ee27184eb",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

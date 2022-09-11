import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// For Development
//import * as dotenv from "dotenv";
//dotenv.config();

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "mindless-34ad8.firebaseapp.com",
  projectId: "mindless-34ad8",
  storageBucket: "mindless-34ad8.appspot.com",
  messagingSenderId: "816247378013",
  appId: "1:816247378013:web:00a8a690d5ad938be13db4",
  measurementId: "G-R9C6S6VYEX",
};

const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);

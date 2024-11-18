import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDWx0ujCnFXdeR5vRSdFL2tMJYqiUN4sWQ",
  authDomain: "ait-capstone-application.firebaseapp.com",
  projectId: "ait-capstone-application",
  storageBucket: "ait-capstone-application.appspot.com",
  messagingSenderId: "987210855736",
  appId: "1:987210855736:web:79c35b8872754b9bfe7dcd"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };

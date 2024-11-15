// Import the necessary Firebase modules
import { initializeApp, getApps } from 'firebase/app';
import { 
  getAuth, 
  onAuthStateChanged, 
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut
} from 'firebase/auth';
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics, isSupported } from 'firebase/analytics';

// Your Firebase configuration object
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// Initialize Firebase
let app;
let auth;
let db;
let storage;
let analytics;

if (!getApps().length) {
  try {
    app = initializeApp(firebaseConfig);
    
    auth = getAuth(app);
    db = getFirestore(app);
    storage = getStorage(app);
    
    // Initialize Analytics only in browser environment
    if (typeof window !== 'undefined') {
      // Check if analytics is supported before initializing
      isSupported().then(supported => {
        if (supported) {
          analytics = getAnalytics(app);
        }
      });
    }
  } catch (error) {
    console.error('Error initializing Firebase:', error);
  }
} else {
  app = getApps()[0];
  auth = getAuth(app);
  db = getFirestore(app);
  storage = getStorage(app);
}

// Helper function to get current user
const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        unsubscribe();
        resolve(user);
      },
      reject
    );
  });
};

// Google Sign In
const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error('Error signing in with Google:', error);
    throw error;
  }
};

// Session management
const setSessionCookie = async (user) => {
  if (user) {
    const idToken = await user.getIdToken();
    // You might want to send this token to your backend to set up a session
    // For now, we'll just store it in localStorage
    localStorage.setItem('userToken', idToken);
  }
};

// Sign out function
const signOutUser = async () => {
  try {
    await signOut(auth);
    localStorage.removeItem('userToken');
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
};

export { 
  app,  // Changed from firebaseApp to app
  auth, 
  db, 
  storage, 
  analytics,
  getCurrentUser,
  signInWithGoogle,
  setSessionCookie,
  signOutUser,
  // Export commonly used Firestore functions
  collection,
  getDocs,
  query,
  where
};
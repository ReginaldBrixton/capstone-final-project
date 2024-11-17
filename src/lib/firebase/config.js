import { initializeApp, getApps } from 'firebase/app';
import { 
  getAuth, 
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  createUserWithEmailAndPassword as firebaseCreateUser
} from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// Initialize Firebase
const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Connect to emulator if configured
if (process.env.NEXT_PUBLIC_USE_FIREBASE_EMULATOR === 'true' && process.env.NEXT_PUBLIC_FIREBASE_EMULATOR_HOST) {
  const [host, port] = process.env.NEXT_PUBLIC_FIREBASE_EMULATOR_HOST.split(':');
  if (host && port) {
    connectFirestoreEmulator(db, host, parseInt(port));
    console.log(`Connected to Firestore emulator at ${host}:${port}`);
  }
}

// Helper function to get user-friendly error messages
function getAuthErrorMessage(error) {
  switch (error.code) {
    case 'auth/invalid-phone-number':
      return 'The phone number is invalid. Please enter a valid phone number.';
    case 'auth/operation-not-allowed':
      return 'Phone authentication is currently not supported in your region. Please try a different sign-in method or contact support.';
    case 'auth/captcha-check-failed':
      return 'reCAPTCHA verification failed. Please try again.';
    case 'auth/quota-exceeded':
      return 'SMS quota exceeded. Please try again later.';
    case 'auth/user-disabled':
      return 'This account has been disabled. Please contact support.';
    case 'auth/invalid-verification-code':
      return 'Invalid verification code. Please try again.';
    case 'auth/missing-verification-code':
      return 'Please enter the verification code sent to your phone.';
    case 'auth/provider-already-linked':
      return 'This phone number is already linked to an account.';
    case 'auth/code-expired':
      return 'The verification code has expired. Please request a new code.';
    case 'auth/credential-already-in-use':
      return 'This phone number is already associated with a different account.';
    case 'auth/network-request-failed':
      return 'Network error. Please check your internet connection and try again.';
    case 'auth/too-many-requests':
      return 'Too many attempts. Please try again later.';
    default:
      return error.message || 'An error occurred. Please try again.';
  }
}

// Google Sign In
const googleProvider = new GoogleAuthProvider();
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error('Error signing in with Google:', error);
    throw new Error(getAuthErrorMessage(error));
  }
};

// Email/Password Sign In
export const signInWithEmailPassword = async (email, password) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return result.user;
  } catch (error) {
    console.error('Error signing in with email/password:', error);
    throw new Error(getAuthErrorMessage(error));
  }
};

// Email/Password Sign Up
export const createUserWithEmailAndPassword = async (email, password) => {
  try {
    const result = await firebaseCreateUser(auth, email, password);
    return result.user;
  } catch (error) {
    console.error('Error creating user with email/password:', error);
    throw new Error(getAuthErrorMessage(error));
  }
};

// Phone Authentication
let recaptchaVerifier = null;
export const signInWithPhone = async (phoneNumber, containerId = 'phone-recaptcha') => {
  try {
    // Format phone number to E.164 format
    const formattedNumber = phoneNumber.startsWith('+') ? phoneNumber : `+${phoneNumber}`;
    
    // Clean up any existing reCAPTCHA widgets
    if (recaptchaVerifier) {
      try {
        await recaptchaVerifier.clear();
      } catch (e) {
        console.warn('Error clearing reCAPTCHA:', e);
      }
      recaptchaVerifier = null;
    }

    // Get the container element
    const container = document.getElementById(containerId);
    if (!container) {
      throw new Error(`reCAPTCHA container '${containerId}' not found`);
    }

    // Clear the container
    container.innerHTML = '';

    // Create new reCAPTCHA verifier
    recaptchaVerifier = new RecaptchaVerifier(auth, containerId, {
      size: 'invisible',
      callback: () => {
        console.log('reCAPTCHA verified');
      },
      'expired-callback': () => {
        console.log('reCAPTCHA expired');
        if (recaptchaVerifier) {
          recaptchaVerifier.clear();
          recaptchaVerifier = null;
        }
      }
    });

    // Render the reCAPTCHA widget
    await recaptchaVerifier.render();

    // Send verification code
    const confirmationResult = await signInWithPhoneNumber(auth, formattedNumber, recaptchaVerifier);
    return confirmationResult;
  } catch (error) {
    console.error('Error signing in with phone:', error);
    if (recaptchaVerifier) {
      try {
        await recaptchaVerifier.clear();
      } catch (e) {
        console.warn('Error clearing reCAPTCHA:', e);
      }
      recaptchaVerifier = null;
    }
    throw new Error(getAuthErrorMessage(error));
  }
};

export const verifyPhoneCode = async (confirmationResult, code) => {
  try {
    const result = await confirmationResult.confirm(code);
    return result.user;
  } catch (error) {
    console.error('Error verifying code:', error);
    throw new Error(getAuthErrorMessage(error));
  } finally {
    // Clean up reCAPTCHA
    if (recaptchaVerifier) {
      try {
        await recaptchaVerifier.clear();
      } catch (e) {
        console.warn('Error clearing reCAPTCHA:', e);
      }
      recaptchaVerifier = null;
    }
  }
};

// Sign Out
export const signOutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Error signing out:', error);
    throw new Error(getAuthErrorMessage(error));
  }
};

export { auth, db };

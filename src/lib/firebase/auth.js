import { 
  signInWithEmailAndPassword,
  signInWithRedirect,
  getRedirectResult as getFirebaseRedirectResult,
  signOut,
  createUserWithEmailAndPassword as firebaseCreateUser,
  GoogleAuthProvider
} from 'firebase/auth';
import { auth } from './config';

// Initialize Google provider
const googleProvider = new GoogleAuthProvider();

// Keep track of auth state
const authState = {
  isRedirectInProgress: false
};

// Helper function to get user-friendly error messages
function getAuthErrorMessage(error) {
  switch (error?.code) {
    case 'auth/account-exists-with-different-credential':
      return { message: 'An account already exists with this email.', level: 'error' };
    case 'auth/user-disabled':
      return { message: 'This account has been disabled.', level: 'error' };
    case 'auth/user-not-found':
      return { message: 'No account found.', level: 'error' };
    case 'auth/wrong-password':
      return { message: 'Invalid password.', level: 'error' };
    default:
      return { 
        message: 'Authentication error. Please try again.',
        level: 'error'
      };
  }
}

// Google Sign In
export async function signInWithGoogle() {
  try {
    await signInWithRedirect(auth, googleProvider);
    return { 
      user: null, 
      error: { message: 'Redirecting to Google...', level: 'info' }
    };
  } catch (error) {
    console.error('Google sign-in error:', error);
    return { 
      user: null, 
      error: getAuthErrorMessage(error)
    };
  }
}

// Check redirect result
export async function checkRedirectResult() {
  try {
    const result = await getFirebaseRedirectResult(auth);
    if (result?.user) {
      return { 
        user: result.user, 
        error: { message: 'Successfully signed in!', level: 'success' }
      };
    }
    return { user: null, error: null };
  } catch (error) {
    console.error('Redirect result error:', error);
    return { 
      user: null, 
      error: getAuthErrorMessage(error)
    };
  }
}

// Email/Password Sign In
export async function signInWithEmailPassword(email, password) {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return { 
      user: result.user, 
      error: { message: 'Successfully signed in!', level: 'success' }
    };
  } catch (error) {
    console.error('Email/password sign-in error:', error);
    return { 
      user: null, 
      error: getAuthErrorMessage(error)
    };
  }
}

// Email/Password Sign Up
export async function createUserWithEmailAndPassword(email, password) {
  try {
    const result = await firebaseCreateUser(auth, email, password);
    return { 
      user: result.user, 
      error: { message: 'Account created successfully!', level: 'success' }
    };
  } catch (error) {
    console.error('User creation error:', error);
    return { 
      user: null, 
      error: getAuthErrorMessage(error)
    };
  }
}

// Sign Out
export async function signOutUser() {
  try {
    await signOut(auth);
    return { error: null };
  } catch (error) {
    console.error('Sign out error:', error);
    return { error: getAuthErrorMessage(error) };
  }
}

export { auth };

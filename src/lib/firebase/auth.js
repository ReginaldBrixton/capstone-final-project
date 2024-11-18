import { 
  signInWithEmailAndPassword,
  signInWithRedirect,
  getRedirectResult as getFirebaseRedirectResult,
  signOut,
  createUserWithEmailAndPassword as firebaseCreateUser,
  GoogleAuthProvider,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence
} from 'firebase/auth';
import { auth } from './config';

// Initialize Google provider with minimal scopes
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account',
  // Minimal scope for basic profile
  scope: 'profile email',
  // Disable additional Google services
  access_type: 'online',
  include_granted_scopes: false
});

// Keep track of auth state
const authState = {
  isRedirectInProgress: false,
  lastError: null
};

// Helper function to get user-friendly error messages
function getAuthErrorMessage(error) {
  // Handle ad blocker related errors silently
  if (error?.message?.includes('network') || error?.message?.includes('fetch')) {
    return { message: null };
  }

  switch (error?.code) {
    case 'auth/account-exists-with-different-credential':
      return { message: 'An account already exists with this email.', level: 'error' };
    case 'auth/user-disabled':
      return { message: 'This account has been disabled. Please contact support.', level: 'error' };
    case 'auth/user-not-found':
      return { message: 'No account found with these credentials.', level: 'error' };
    case 'auth/wrong-password':
      return { message: 'Invalid password. Please try again.', level: 'error' };
    case 'auth/network-request-failed':
      return { message: 'Connection issue. Please check your internet.', level: 'error' };
    case 'auth/timeout':
      return { message: 'Request timeout. Please try again.', level: 'error' };
    case 'auth/internal-error':
      // Suppress internal errors that might be related to ad blockers
      return { message: null };
    default:
      // Suppress ad blocker related errors
      if (error?.message?.includes('blocked') || error?.message?.includes('failed to fetch')) {
        return { message: null };
      }
      return { 
        message: error?.message || 'Authentication error. Please try again.',
        level: 'error'
      };
  }
}

// Set persistence to SESSION to avoid storage blocking issues
try {
  setPersistence(auth, browserSessionPersistence).catch(console.error);
} catch (error) {
  console.error('Error setting persistence:', error);
}

// Google Sign In (Redirect only)
export async function signInWithGoogle() {
  try {
    if (authState.isRedirectInProgress) {
      return { 
        user: null, 
        error: { message: 'Sign-in already in progress...', level: 'info' }
      };
    }

    authState.isRedirectInProgress = true;
    
    // Use a try-catch block for the redirect
    try {
      await signInWithRedirect(auth, googleProvider);
    } catch (redirectError) {
      // If redirect fails, try setting persistence to local and retry
      if (redirectError?.code === 'auth/failed-precondition') {
        await setPersistence(auth, browserLocalPersistence);
        await signInWithRedirect(auth, googleProvider);
      } else {
        throw redirectError;
      }
    }
    
    return { 
      user: null, 
      error: { message: 'Redirecting to Google sign-in...', level: 'info' }
    };
  } catch (error) {
    console.error('Google sign-in error:', error);
    authState.isRedirectInProgress = false;
    return { 
      user: null, 
      error: getAuthErrorMessage(error)
    };
  }
}

// Check redirect result with retry
export async function checkRedirectResult() {
  if (!authState.isRedirectInProgress) {
    return { user: null, error: null };
  }

  try {
    const result = await getFirebaseRedirectResult(auth);
    authState.isRedirectInProgress = false;
    
    if (result?.user) {
      return { 
        user: result.user, 
        error: { message: 'Successfully signed in!', level: 'success' }
      };
    }
    return { user: null, error: null };
  } catch (error) {
    console.error('Redirect result error:', error);
    authState.isRedirectInProgress = false;

    // If the error is related to storage/cookies, try with session persistence
    if (error?.code === 'auth/failed-precondition') {
      try {
        await setPersistence(auth, browserSessionPersistence);
        const retryResult = await getFirebaseRedirectResult(auth);
        if (retryResult?.user) {
          return { 
            user: retryResult.user, 
            error: { message: 'Successfully signed in!', level: 'success' }
          };
        }
      } catch (retryError) {
        console.error('Retry error:', retryError);
      }
    }

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

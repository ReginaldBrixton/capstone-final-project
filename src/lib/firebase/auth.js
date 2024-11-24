import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword as createUserWithEmailPasswordFirebase,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  fetchSignInMethodsForEmail
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from './config';

const googleProvider = new GoogleAuthProvider();

// Define consistent route paths
const ROUTE_PATHS = {
  ADMIN: '/admin',
  SUPERVISOR: '/supervisor',
  STUDENT: '/student',
  LOGIN: '/login',
  UNAUTHORIZED: '/unauthorized'
};

export const getDefaultRoute = (role) => {
  switch (role) {
    case 'admin':
      return ROUTE_PATHS.ADMIN;
    case 'supervisor':
      return ROUTE_PATHS.SUPERVISOR;
    case 'student':
      return ROUTE_PATHS.STUDENT;
    default:
      return ROUTE_PATHS.UNAUTHORIZED;
  }
};

// Email/Password Registration
export const createUserWithEmailAndPassword = async (email, password, name = '') => {
  try {
    // Validate email and password
    if (!email || !password) {
      return {
        success: false,
        error: {
          title: 'Missing Information',
          message: 'Please provide both email and password.',
          variant: 'warning',
          duration: 4000
        }
      };
    }

    // Check if user already exists
    try {
      const methods = await fetchSignInMethodsForEmail(auth, email.toLowerCase());
      if (methods.length > 0) {
        return {
          success: false,
          error: {
            title: 'Account Exists',
            message: 'An account with this email already exists. Please sign in instead.',
            variant: 'info',
            action: {
              label: 'Sign In',
              href: '/login'
            },
            duration: 5000
          }
        };
      }
    } catch (error) {
      console.error('Error checking email existence:', error);
    }

    // Create the authentication user
    const userCredential = await createUserWithEmailPasswordFirebase(auth, email.toLowerCase(), password);
    const user = userCredential.user;
    
    try {
      // Check if email is for admin or supervisor
      const isAdmin = email.toLowerCase() === 'admin@gmail.com';
      const isSupervisor = email.toLowerCase() === 'supervisor@gmail.com';
      const role = isAdmin ? 'admin' : (isSupervisor ? 'supervisor' : 'student');

      // Create user document with consistent schema
      const userData = {
        role,
        email: user.email.toLowerCase(),
        displayName: name || user.displayName || '',
        photoURL: user.photoURL || '',
        emailVerified: user.emailVerified,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        lastLoginAt: new Date().toISOString()
      };
      
      await setDoc(doc(db, 'users', user.uid), userData);
      
      return {
        success: true,
        user: { ...user, role: userData.role },
        message: {
          title: 'Welcome!',
          message: 'Your account has been created successfully.',
          variant: 'success',
          duration: 5000
        }
      };
    } catch (error) {
      console.error('Error creating user document:', error);
      // Clean up: delete the auth user if Firestore document creation fails
      await user.delete();
      throw new Error('Failed to create user profile. Please try again.');
    }
  } catch (error) {
    console.error('Registration error:', error);
    return {
      success: false,
      error: getAuthErrorMessage(error)
    };
  }
};

// Email/Password Sign In
export const signInWithEmailPassword = async (email, password) => {
  try {
    // First check if the user exists
    try {
      const methods = await fetchSignInMethodsForEmail(auth, email.toLowerCase());
      if (methods.length === 0) {
        return {
          success: false,
          error: {
            title: 'Account Not Found',
            message: 'No account exists with this email address. Would you like to create one?',
            variant: 'warning',
            action: {
              label: 'Sign Up',
              href: '/signup'
            },
            duration: 6000
          }
        };
      }
    } catch (error) {
      console.error('Error checking email existence:', error);
    }

    // Proceed with authentication
    const userCredential = await signInWithEmailAndPassword(auth, email.toLowerCase(), password);
    const user = userCredential.user;
    
    try {
      // Get or create user role and ensure user document exists
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      let role;
      
      if (!userDoc.exists()) {
        // Check if email is for admin or supervisor
        const isAdmin = email.toLowerCase() === 'admin@gmail.com';
        const isSupervisor = email.toLowerCase() === 'supervisor@gmail.com';
        role = isAdmin ? 'admin' : (isSupervisor ? 'supervisor' : 'student');

        // Create user document if it doesn't exist
        const userData = {
          role,
          email: user.email.toLowerCase(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          lastLoginAt: new Date().toISOString(),
          displayName: user.displayName || '',
          photoURL: user.photoURL || '',
          emailVerified: user.emailVerified
        };
        await setDoc(doc(db, 'users', user.uid), userData);
      } else {
        role = userDoc.data().role;
        // Update last login
        await setDoc(doc(db, 'users', user.uid), {
          lastLoginAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }, { merge: true });
      }

      if (!role) {
        return {
          success: false,
          error: {
            title: 'Role Assignment Failed',
            message: 'Unable to determine user role. Please contact support.',
            variant: 'error',
            action: {
              label: 'Contact Support',
              href: '/support'
            },
            duration: 5000
          }
        };
      }

      // Get the redirect path based on role
      const redirectPath = getDefaultRoute(role);
      
      return {
        success: true,
        user: { ...user, role },
        redirectPath
      };
      
    } catch (error) {
      console.error('Error handling user document:', error);
      return {
        success: false,
        error: {
          title: 'Database Error',
          message: 'Error accessing user data. Please try again.',
          variant: 'error',
          action: {
            label: 'Try Again',
            onClick: () => window.location.reload()
          },
          duration: 5000
        }
      };
    }
  } catch (error) {
    console.error('Sign in error:', error);
    return {
      success: false,
      error: getAuthErrorMessage(error)
    };
  }
};

// Google Sign In
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    
    try {
      // Try to get the user document
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      let role;
      
      if (!userDoc.exists()) {
        // Create user document with consistent schema
        const userData = {
          role: 'student', // Default role
          email: user.email,
          displayName: user.displayName || '',
          photoURL: user.photoURL || '',
          emailVerified: user.emailVerified,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          lastLoginAt: new Date().toISOString()
        };
        await setDoc(doc(db, 'users', user.uid), userData);
        role = userData.role;
      } else {
        role = userDoc.data().role;
        // Update last login
        await setDoc(doc(db, 'users', user.uid), {
          lastLoginAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }, { merge: true });
      }

      // Get the route based on user's role
      const redirectPath = getDefaultRoute(role);
      return { 
        success: true, 
        user: { ...user, role },
        redirectPath 
      };

    } catch (error) {
      console.error('Error handling user document:', error);
      throw error;
    }
  } catch (error) {
    console.error('Google sign in error:', error);
    return {
      success: false,
      error: getAuthErrorMessage(error)
    };
  }
};

// Check Redirect Result
export const checkRedirectResult = async () => {
  try {
    const result = await getRedirectResult(auth);
    if (result) {
      const role = await getUserRole(result.user.uid, result.user.email);
      return {
        user: { ...result.user, role },
        error: null
      };
    }
    return {
      user: null,
      error: null
    };
  } catch (error) {
    console.error("Redirect result error:", error);
    return {
      user: null,
      error: getAuthErrorMessage(error)
    };
  }
};

// Error Message Handler
export const getAuthErrorMessage = (error) => {
  switch (error.code) {
    case 'auth/invalid-credential':
      return {
        title: 'Incorrect Password',
        message: 'The password you entered is incorrect. Please try again or reset your password if you forgot it.',
        variant: 'error',
        action: {
          label: 'Reset Password',
          href: '/forgot-password'
        },
        duration: 5000
      };

    case 'auth/wrong-password':
      return {
        title: 'Invalid Password',
        message: 'Please check your password and try again.',
        variant: 'error',
        action: {
          label: 'Reset Password',
          href: '/forgot-password'
        },
        duration: 5000
      };

    case 'auth/user-not-found':
      return {
        title: 'Account Not Found',
        message: 'No account exists with this email address. Would you like to create one?',
        variant: 'warning',
        action: {
          label: 'Sign Up',
          href: '/signup'
        },
        duration: 6000
      };

    case 'auth/email-already-in-use':
      return {
        title: 'Email Already Registered',
        message: 'An account already exists with this email. Would you like to sign in instead?',
        variant: 'info',
        action: {
          label: 'Sign In',
          href: '/login'
        },
        duration: 6000
      };

    case 'auth/weak-password':
      return {
        title: 'Weak Password',
        message: 'Your password should be at least 6 characters long and include a mix of letters, numbers, and symbols.',
        variant: 'warning',
        duration: 6000
      };

    case 'auth/network-request-failed':
      return {
        title: 'Connection Error',
        message: 'Please check your internet connection and try again.',
        variant: 'error',
        action: {
          label: 'Retry',
          onClick: () => window.location.reload()
        },
        duration: 5000
      };

    case 'auth/too-many-requests':
      return {
        title: 'Too Many Attempts',
        message: 'Access has been temporarily disabled due to many failed login attempts. Please try again later or reset your password.',
        variant: 'error',
        action: {
          label: 'Reset Password',
          href: '/forgot-password'
        },
        duration: 8000
      };

    case 'auth/popup-closed-by-user':
    case 'auth/cancelled-popup-request':
      return {
        title: 'Sign In Cancelled',
        message: 'The sign in was cancelled. Please try again.',
        variant: 'error',
        action: {
          label: 'Try Again',
          onClick: () => window.location.reload()
        },
        duration: 5000
      };

    default:
      return {
        title: 'Authentication Error',
        message: error.message || 'An unexpected error occurred.',
        variant: 'error',
        action: {
          label: 'Try Again',
          onClick: () => window.location.reload()
        },
        duration: 5000
      };
  }
};

export const getUserRole = async (uid, email) => {
  try {
    const userDoc = await getDoc(doc(db, 'users', uid));
    if (userDoc.exists()) {
      return userDoc.data().role;
    }

    // If document doesn't exist, check if email is admin
    const isAdmin = email === 'admin@gmail.com';
    const isSupervisor = email === 'supervisor@gmail.com';
    
    // Create user document with appropriate role
    const userData = {
      role: isAdmin ? 'admin' : (isSupervisor ? 'supervisor' : 'student'),
      email: email,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      lastLoginAt: new Date().toISOString(),
      displayName: '',
      photoURL: '',
      emailVerified: false
    };
    
    await setDoc(doc(db, 'users', uid), userData);
    return userData.role;
    
  } catch (error) {
    console.error('Error fetching user role:', error);
    return null;
  }
};

export { auth };

export async function handleAuthRouting(user) {
  if (!user || !user.role) {
    return ROUTE_PATHS.LOGIN;
  }

  return getDefaultRoute(user.role);
}

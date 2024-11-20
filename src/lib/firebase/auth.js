import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword as createUserWithEmailPasswordFirebase,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from './config';

const googleProvider = new GoogleAuthProvider();

// Email/Password Sign In
export const signInWithEmailPassword = async (email, password) => {
  try {
    // First authenticate the user
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    try {
      // Get or create user role and ensure user document exists
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      let role;
      
      if (!userDoc.exists()) {
        // Create user document if it doesn't exist
        const userData = {
          role: 'student', // Default role
          email: user.email,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          lastLoginAt: new Date().toISOString(),
          displayName: user.displayName || '',
          photoURL: user.photoURL || '',
          emailVerified: user.emailVerified
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

      if (!role) {
        throw new Error('Unable to determine user role');
      }

      // Get the redirect path based on role
      const redirectPath = await handleAuthRouting({ ...user, role });
      
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
    console.error('Sign in error:', error);
    throw error;
  }
};

// Email/Password Registration
export const createUserWithEmailAndPassword = async (email, password, name = '') => {
  try {
    // First create the authentication user
    const userCredential = await createUserWithEmailPasswordFirebase(auth, email, password);
    const user = userCredential.user;
    
    try {
      // Create user document with consistent schema
      const userData = {
        role: 'student', // Default role
        email: user.email,
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
        redirectPath: '/student' // Default redirect for new users
      };
    } catch (error) {
      // If Firestore document creation fails, delete the auth user
      await user.delete();
      throw error;
    }
  } catch (error) {
    console.error("Registration error:", error);
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
      const redirectPath = await handleAuthRouting({ ...user, role });
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
const getAuthErrorMessage = (error) => {
  switch (error.code) {
    case 'auth/user-not-found':
      return {
        message: 'No user found with this email address',
        level: 'error'
      };
    case 'auth/wrong-password':
      return {
        message: 'Invalid email or password',
        level: 'error'
      };
    case 'auth/invalid-credential':
      return {
        message: 'Invalid email or password',
        level: 'error'
      };
    case 'auth/invalid-email':
      return {
        message: 'Invalid email address',
        level: 'error'
      };
    case 'auth/user-disabled':
      return {
        message: 'This account has been disabled',
        level: 'error'
      };
    case 'auth/email-already-in-use':
      return {
        message: 'Email already in use',
        level: 'error'
      };
    case 'auth/operation-not-allowed':
      return {
        message: 'Operation not allowed',
        level: 'error'
      };
    case 'auth/weak-password':
      return {
        message: 'Password is too weak',
        level: 'error'
      };
    default:
      return {
        message: error.message || 'An error occurred during authentication',
        level: 'error'
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
    return '/login';
  }

  switch (user.role) {
    case 'admin':
      return '/admin';
    case 'supervisor':
      return '/supervisor';
    case 'student':
      return '/student';
    default:
      return '/unauthorized';
  }
}

'use client'

import { useState, useCallback, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useToast } from '../components/ui/useToast'
import {
  signInWithEmailPassword,
  signInWithGoogle,
  createUserWithEmailAndPassword,
  checkRedirectResult,
  auth,
  getUserRole
} from '../lib/firebase/auth'
import { onAuthStateChanged } from 'firebase/auth'
import { getDoc, doc } from 'firebase/firestore'

export function useAuth() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const router = useRouter()
  const { toast } = useToast()

  // Track auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  // Handle auth state and messages
  const handleAuthResponse = useCallback(({ success, user, redirectPath, error }) => {
    if (error) {
      toast({
        title: error.level === 'success' ? 'Success' : 'Error',
        description: error.message,
        variant: error.level === 'success' ? 'default' : 'destructive',
        duration: error.level === 'error' ? 5000 : 2000,
      });
    }
    return { success, user, redirectPath };
  }, [toast]);

  // Check for redirect result
  useEffect(() => {
    const handleRedirectResult = async () => {
      try {
        const result = await checkRedirectResult();
        if (result.user) {
          const response = handleAuthResponse(result);
          if (response.redirectPath) {
            router.push(response.redirectPath);
          }
        } else if (result.error?.message) {
          handleAuthResponse(result);
        }
      } catch (err) {
        console.error('Error checking redirect result:', err);
        handleAuthResponse({ 
          error: { 
            message: err.message, 
            level: 'error' 
          } 
        });
      }
    };

    handleRedirectResult();
  }, [router, handleAuthResponse]);

  const handleAuthStateChanged = async (user) => {
    setLoading(true);
    if (user) {
      try {
        // Get user role from Firestore
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        const role = userDoc.exists() ? userDoc.data().role : 'student';
        
        // Update user state with role
        setUser({ ...user, role });
        
        // Route based on role
        switch (role) {
          case 'admin':
            router.push('/admin/dashboard');
            break;
          case 'supervisor':
            router.push('/supervisor/dashboard');
            break;
          case 'student':
            router.push('/student/dashboard');
            break;
          default:
            router.push('/unauthorized');
        }
      } catch (error) {
        console.error('Error fetching user role:', error);
        router.push('/unauthorized');
      }
    } else {
      setUser(null);
      router.push('/login');
    }
    setLoading(false);
  };

  // Email/Password Authentication
  const handleEmailAuth = useCallback(async (email, password, isSignIn = true, userData = null, rememberMe = false) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await signInWithEmailPassword(email, password);
      return handleAuthResponse(result);
    } catch (error) {
      setError(error.message);
      return { success: false, user: null, redirectPath: null };
    } finally {
      setIsLoading(false);
    }
  }, [handleAuthResponse]);

  // Google Authentication
  const handleGoogleAuth = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await signInWithGoogle();
      return handleAuthResponse(result);
    } catch (error) {
      setError(error.message);
      return { success: false, user: null, redirectPath: null };
    } finally {
      setIsLoading(false);
    }
  }, [handleAuthResponse]);

  return {
    user,
    loading,
    isLoading,
    error,
    handleEmailAuth,
    handleGoogleAuth,
  }
}

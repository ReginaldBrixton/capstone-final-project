'use client'

import { useState, useCallback, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useToast } from '../components/ui/useToast'
import {
  signInWithEmailPassword,
  signInWithGoogle,
  createUserWithEmailAndPassword,
  checkRedirectResult
} from '../lib/firebase/auth'

export function useAuth() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const router = useRouter()
  const { toast } = useToast()

  // Handle auth state and messages
  const handleAuthResponse = useCallback(({ user, error }) => {
    if (error?.message) {
      toast({
        title: error.level === 'success' ? 'Success' : error.level === 'info' ? 'Info' : 'Error',
        description: error.message,
        variant: error.level === 'success' ? 'default' : error.level === 'info' ? 'default' : 'destructive',
        duration: error.level === 'error' ? 5000 : 2000,
      });
    }
    return !!user;
  }, [toast]);

  // Check for redirect result on mount and when returning to the app
  useEffect(() => {
    let mounted = true;

    const handleRedirectResult = async () => {
      try {
        const result = await checkRedirectResult();
        
        if (!mounted) return;

        if (result.user) {
          handleAuthResponse(result);
          router.push('/dashboard');
        } else if (result.error?.message) {
          handleAuthResponse(result);
        }
      } catch (err) {
        console.error('Error checking redirect result:', err);
        if (mounted) {
          handleAuthResponse({ 
            error: { 
              message: 'Failed to complete sign-in. Please try again.', 
              level: 'error' 
            } 
          });
        }
      }
    };

    handleRedirectResult();

    // Also check when the page becomes visible again
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        handleRedirectResult();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      mounted = false;
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [router, handleAuthResponse]);

  const handleEmailAuth = async (email, password, isLogin = false) => {
    try {
      setIsLoading(true)
      setError(null)
      
      const authFunction = isLogin ? signInWithEmailPassword : createUserWithEmailAndPassword;
      const result = await authFunction(email, password);
      
      const success = handleAuthResponse(result);
      if (success) {
        router.push('/dashboard');
      }
      
      return success;
    } catch (err) {
      handleAuthResponse({ 
        error: { 
          message: err.message, 
          level: 'error' 
        } 
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleAuth = useCallback(async () => {
    if (isLoading) return false;

    try {
      setIsLoading(true)
      setError(null)
      
      const result = await signInWithGoogle();
      handleAuthResponse(result);
      
      // No need to redirect here as it's handled by Firebase redirect
      return true;
    } catch (err) {
      handleAuthResponse({ 
        error: { 
          message: err.message, 
          level: 'error' 
        } 
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, handleAuthResponse]);

  return {
    isLoading,
    error,
    handleEmailAuth,
    handleGoogleAuth,
  }
}

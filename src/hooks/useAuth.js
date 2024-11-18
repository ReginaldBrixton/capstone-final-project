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

  // Check for redirect result
  useEffect(() => {
    const handleRedirectResult = async () => {
      try {
        const result = await checkRedirectResult();
        if (result.user) {
          handleAuthResponse(result);
          router.push('/dashboard');
        } else if (result.error?.message) {
          handleAuthResponse(result);
        }
      } catch (err) {
        console.error('Error checking redirect result:', err);
      }
    };

    handleRedirectResult();
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
    try {
      setIsLoading(true)
      setError(null)
      
      const result = await signInWithGoogle();
      handleAuthResponse(result);
      
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
  }, [handleAuthResponse]);

  return {
    isLoading,
    error,
    handleEmailAuth,
    handleGoogleAuth,
  }
}

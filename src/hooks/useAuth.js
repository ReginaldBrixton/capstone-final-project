'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  signInWithEmailPassword,
  signInWithGoogle,
  createUserWithEmailAndPassword,
} from '../lib/firebase/auth'

export function useAuth() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const router = useRouter()

  const handleEmailAuth = async (email, password, isLogin = false) => {
    try {
      setIsLoading(true)
      setError(null)
      
      if (isLogin) {
        await signInWithEmailPassword(email, password)
      } else {
        await createUserWithEmailAndPassword(email, password)
      }
      
      router.push('/dashboard')
      return true
    } catch (err) {
      setError(err.message)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleAuth = async () => {
    try {
      setIsLoading(true)
      setError(null)
      await signInWithGoogle()
      router.push('/dashboard')
      return true
    } catch (err) {
      setError(err.message)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  return {
    isLoading,
    error,
    setError,
    handleEmailAuth,
    handleGoogleAuth
  }
}

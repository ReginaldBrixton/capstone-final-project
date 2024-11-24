import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  signInWithEmailPassword,
  signInWithGoogle,
  createUserWithEmailAndPassword,
  auth,
  getAuthErrorMessage
} from '../lib/firebase/auth'
import { db } from '../lib/firebase/config'
import { onAuthStateChanged } from 'firebase/auth'
import { getDoc, doc } from 'firebase/firestore'
import { useToast } from '../components/ui/useToast'

export function useAuth() {
  const router = useRouter()
  const { toast } = useToast()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid))
          if (userDoc.exists()) {
            const userData = userDoc.data()
            setUser({ ...user, role: userData.role })
          } else {
            setUser(user)
          }
        } catch (error) {
          console.error('Error fetching user data:', error)
          setUser(user)
        }
      } else {
        setUser(null)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const handleEmailAuth = async (email, password, name = '', isRegistration = false) => {
    try {
      // Validate input
      if (!email || !password) {
        toast({
          title: 'Missing Information',
          description: 'Please enter both email and password.',
          variant: 'warning',
          duration: 3000
        })
        return
      }

      // Trim whitespace from email and password
      const trimmedEmail = email.trim().toLowerCase()
      const trimmedPassword = password.trim()

      const result = isRegistration
        ? await createUserWithEmailAndPassword(trimmedEmail, trimmedPassword, name)
        : await signInWithEmailPassword(trimmedEmail, trimmedPassword)

      if (result.success) {
        toast({
          title: isRegistration ? 'Welcome!' : 'Welcome back!',
          description: isRegistration 
            ? 'Your account has been created successfully.' 
            : 'You have been logged in successfully.',
          variant: 'success',
          duration: 3000
        })
        
        if (result.redirectPath) {
          router.push(result.redirectPath)
        }
      } else if (result.error) {
        const errorDetails = getAuthErrorMessage(result.error)
        
        toast({
          title: errorDetails.title,
          description: errorDetails.message,
          variant: 'destructive',
          duration: 5000,
          action: errorDetails.action && {
            label: errorDetails.action.label,
            onClick: () => {
              if (errorDetails.action.href) {
                router.push(errorDetails.action.href)
              } else if (typeof errorDetails.action.onClick === 'function') {
                errorDetails.action.onClick()
              }
            }
          }
        })
      }
    } catch (error) {
      console.error('Auth error:', error)
      const errorDetails = getAuthErrorMessage(error)
      
      toast({
        title: errorDetails.title,
        description: errorDetails.message,
        variant: 'destructive',
        duration: 5000,
        action: errorDetails.action && {
          label: errorDetails.action.label,
          onClick: () => {
            if (errorDetails.action.href) {
              router.push(errorDetails.action.href)
            } else if (typeof errorDetails.action.onClick === 'function') {
              errorDetails.action.onClick()
            }
          }
        }
      })
    }
  }

  const handleGoogleAuth = async () => {
    try {
      const result = await signInWithGoogle()
      
      if (result.success) {
        toast({
          title: 'Welcome!',
          description: 'You have been logged in successfully with Google.',
          variant: 'success',
          duration: 3000
        })
        
        if (result.redirectPath) {
          router.push(result.redirectPath)
        }
      } else if (result.error) {
        const errorDetails = getAuthErrorMessage(result.error)
        
        toast({
          title: errorDetails.title,
          description: errorDetails.message,
          variant: 'destructive',
          duration: 5000,
          action: errorDetails.action && {
            label: errorDetails.action.label,
            onClick: () => {
              if (errorDetails.action.href) {
                router.push(errorDetails.action.href)
              } else if (typeof errorDetails.action.onClick === 'function') {
                errorDetails.action.onClick()
              }
            }
          }
        })
      }
    } catch (error) {
      console.error('Google auth error:', error)
      const errorDetails = getAuthErrorMessage(error)
      
      toast({
        title: errorDetails.title,
        description: errorDetails.message,
        variant: 'destructive',
        duration: 5000,
        action: errorDetails.action && {
          label: errorDetails.action.label,
          onClick: () => {
            if (errorDetails.action.href) {
              router.push(errorDetails.action.href)
            } else if (typeof errorDetails.action.onClick === 'function') {
              errorDetails.action.onClick()
            }
          }
        }
      })
    }
  }

  const handleLogout = async () => {
    try {
      await auth.signOut()
      router.push('/login')
      toast({
        title: 'Logged out',
        description: 'You have been successfully logged out.',
        variant: 'default',
        duration: 3000
      })
    } catch (error) {
      console.error('Logout error:', error)
      toast({
        title: 'Error',
        description: 'Failed to log out. Please try again.',
        variant: 'destructive',
        duration: 5000,
        action: {
          label: 'Try Again',
          onClick: () => handleLogout()
        }
      })
    }
  }

  return {
    user,
    loading,
    handleEmailAuth,
    handleGoogleAuth,
    handleLogout
  }
}

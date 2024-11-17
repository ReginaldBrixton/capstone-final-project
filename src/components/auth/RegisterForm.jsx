'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { FormInput } from './components/FormInput'
import { Button } from '../form/button'
import { SocialAuthButtons } from './components/SocialAuthButtons'
import { FormDivider } from './components/FormDivider'
import { PasswordStrengthIndicator } from './components/PasswordStrengthIndicator'
import { PasswordRequirements } from './components/PasswordRequirements'
import { useAuth } from '@/hooks/useAuth'

export default function RegisterForm() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [passwordStrength, setPasswordStrength] = useState(0)
  const [formErrors, setFormErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { isLoading, error, handleEmailAuth, handleGoogleAuth } = useAuth()

  const calculatePasswordStrength = (password) => {
    let strength = 0
    if (password.length >= 8) strength += 20
    if (password.match(/[A-Z]/)) strength += 20
    if (password.match(/[a-z]/)) strength += 20
    if (password.match(/[0-9]/)) strength += 20
    if (password.match(/[^A-Za-z0-9]/)) strength += 20
    return strength
  }

  const validateField = (name, value) => {
    switch (name) {
      case 'name':
        return value.trim().length < 2 ? {
          message: 'Name must be at least 2 characters long',
          type: 'error'
        } : null
      case 'email':
        return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? {
          message: 'Please enter a valid email address',
          type: 'error'
        } : null
      case 'password':
        if (passwordStrength < 80) {
          return {
  
          }
        }
        if (formData.confirmPassword && value !== formData.confirmPassword) {
          setFormErrors(prev => ({
            ...prev,
            confirmPassword: {
              message: 'Passwords do not match',
              type: 'error'
            }
          }))
        }
        return null
      case 'confirmPassword':
        return value !== formData.password ? {
          message: 'Passwords do not match',
          type: 'error'
        } : null
      default:
        return null
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    const error = validateField(name, value)
    setFormErrors(prev => ({
      ...prev,
      [name]: error
    }))

    if (name === 'password') {
      const strength = calculatePasswordStrength(value)
      setPasswordStrength(strength)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Validate all fields
    const errors = {}
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key])
      if (error) errors[key] = error
    })

    // Additional password match validation
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = {
        message: 'Passwords do not match',
        type: 'error'
      }
    }

    setFormErrors(errors)

    if (Object.keys(errors).length === 0) {
      const success = await handleEmailAuth(formData.email, formData.password, false, formData.name)
      if (success) {
        router.push('/dashboard')
      }
    }
    
    setIsSubmitting(false)
  }

  return (
    <div className="w-full max-w-md mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
          Create your account
        </h1>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Join us and start managing your research projects
        </p>
      </div>

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-2 p-2 rounded-lg bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-[13px]"
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleSubmit} className="space-y-6">
          <FormInput
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            error={formErrors.name?.message}
            errorType={formErrors.name?.type}
            disabled={isLoading || isSubmitting}
            required
          />

          <FormInput
            label="Email address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            error={formErrors.email?.message}
            errorType={formErrors.email?.type}
            disabled={isLoading || isSubmitting}
            required
          />

          <div className="space-y-1">
            <FormInput
              label="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleInputChange}
              error={formErrors.password?.message}
              errorType={formErrors.password?.type}
              disabled={isLoading || isSubmitting}
              required
            />
            
            {formData.password && <PasswordStrengthIndicator strength={passwordStrength} />}
            {formData.password && <PasswordRequirements password={formData.password} />}
          </div>

          <FormInput
            label="Confirm Password"
            name="confirmPassword"
            type={showPassword ? "text" : "password"}
            value={formData.confirmPassword}
            onChange={handleInputChange}
            error={formErrors.confirmPassword?.message}
            errorType={formErrors.confirmPassword?.type}
            disabled={isLoading || isSubmitting}
            required
          />

          <div className="space-y-6">
            <Button
              type="submit"
              disabled={isLoading || isSubmitting}
              className="w-full"
            >
              {isSubmitting ? 'Creating account...' : 'Create account'}
            </Button>

            <FormDivider text="Or continue with" />
            
            <SocialAuthButtons 
              onGoogleClick={handleGoogleAuth}
              disabled={isLoading || isSubmitting}
            />
          </div>

        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
          Already have an account?{' '}
          <Link 
            href="/login" 
            className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
          >
            Sign in
          </Link>
        </p>
      </form>
    </div>
  )
}
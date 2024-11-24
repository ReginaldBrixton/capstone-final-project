'use client'

import RegisterForm from '../../../components/auth/RegisterForm'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const [registrationStatus, setRegistrationStatus] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')
  const router = useRouter()

  const handleRegistration = async (userData) => {
    try {
      setRegistrationStatus(null)
      setErrorMessage('')

      // Log user data
      console.log('User registration data:', {
        name: userData.name,
        email: userData.email,
        password: userData.password
      })

      setRegistrationStatus('success')
      return true
    } catch (error) {
      console.error('Registration error:', error)
      setRegistrationStatus('error')
      setErrorMessage(error.message || 'Registration failed')
      return false
    }
  }

  return (
    <div className="register-page min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="register-container max-w-md w-full space-y-8">
        <RegisterForm onSubmit={handleRegistration} />
        
        {registrationStatus === 'success' && (
          <div className="registration-success-message mt-4 p-4 bg-green-100 text-green-700 rounded-md text-center">
            Registration successful! Redirecting to login...
          </div>
        )}
        {registrationStatus === 'error' && (
          <div className="registration-error-message mt-4 p-4 bg-red-100 text-red-700 rounded-md">
            {errorMessage || 'Registration failed. Please try again.'}
          </div>
        )}
      </div>
    </div>
  )
}
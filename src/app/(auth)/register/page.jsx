'use client'

import RegisterForm from '../../../components/auth/RegisterForm'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const [registrationStatus, setRegistrationStatus] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')
  const router = useRouter()

  async function onSubmit(userData) {
    try {
      setRegistrationStatus(null)
      setErrorMessage('')

      // Add authMethod to the request
      const requestData = {
        ...userData,
        authMethod: userData.authMethod || 'email'
      };

      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      })

      const data = await response.json()

      if (!response.ok) {
        setRegistrationStatus('error')
        setErrorMessage(data.error || 'Registration failed')
        return false
      }

      setRegistrationStatus('success')
      
      // Use the redirect path from the response
      const redirectPath = data.redirect || '/login'
      
      // Delay redirect to show success message
      setTimeout(() => {
        router.push(redirectPath)
      }, 2000)
      
      return true
    } catch (error) {
      console.error('Registration error:', error)
      setRegistrationStatus('error')
      setErrorMessage(error.message || 'Registration failed')
      return false
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <RegisterForm 
          onSubmit={onSubmit}
          status={registrationStatus}
          error={errorMessage}
        />
        {registrationStatus === 'success' && (
          <div className="mt-4 p-4 bg-green-100 text-green-700 rounded-md text-center">
            Registration successful! Redirecting to login...
          </div>
        )}
        {registrationStatus === 'error' && (
          <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-md">
            {errorMessage || 'Registration failed. Please try again.'}
          </div>
        )}
      </div>
    </div>
  )
}
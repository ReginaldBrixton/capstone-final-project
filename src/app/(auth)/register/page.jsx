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
        authMethod: 'email' // Default to email registration
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
      
      // Delay redirect to show success message
      setTimeout(() => {
        router.push('/login')
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
    <div className="flex min-h-screen flex-col items-center justify-center py-12 sm:px-6 lg:px-8">
      <RegisterForm onSubmit={onSubmit} />
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
  )
}
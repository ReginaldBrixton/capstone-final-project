'use client'

import RegisterForm from '../../../components/auth/RegisterForm'
import { useState } from 'react'

export default function RegisterPage() {
  const [registrationStatus, setRegistrationStatus] = useState(null)

  async function onSubmit(userData) {
    try {
      // Here you would typically make an API call to your backend
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Registration failed')
      }

      const data = await response.json()
      setRegistrationStatus('success')
      
      // Optional: Redirect to login page or dashboard
      // window.location.href = '/login'
      
      return data
    } catch (error) {
      // For demonstration purposes, we'll throw an error if the email contains "test"
      if (userData.email.includes('test')) {
        throw new Error('This email is already registered. Please try another.')
      }
      
      throw new Error(error.message || 'Registration failed')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-orange-50 to-yellow-100 flex flex-col justify-center p-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <RegisterForm onSubmit={onSubmit} />
        {registrationStatus === 'success' && (
          <div className="mt-4 p-4 bg-green-100 text-green-700 rounded-md text-center">
            Registration successful! You can now login.
          </div>
        )}
      </div>
    </div>
  )
}
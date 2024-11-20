'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import LoginForm from '../../../components/auth/LoginForm'
import TestUserRegistration from '../../../components/auth/components/TestUserRegistration'

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  })

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  async function onSubmit(event) {
    event.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Login failed')
      }

      // Handle successful login
      console.log('Login successful:', data.user)
      
      // Redirect based on user role
      switch (data.user.role) {
        case 'admin':
          router.push('/admin')
          break
        case 'supervisor':
          router.push('/supervisor')
          break
        case 'student':
          router.push('/student')
          break
        default:
          router.push('/')
      }

    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSocialLogin = (provider) => {
    console.log(`Logging in with ${provider}`)
    // Implement social login logic here
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <LoginForm 
          formData={formData}
          isLoading={isLoading}
          error={error}
          onInputChange={handleInputChange}
          onSubmit={onSubmit}
          onSocialLogin={handleSocialLogin}
        />
        
        {/* Add test user registration in development */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-8">
            <TestUserRegistration />
          </div>
        )}
      </div>
    </div>
  )
}

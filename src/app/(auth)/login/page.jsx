'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import LoginForm from '../../../components/auth/LoginForm'

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
      // Log the user's credentials instead of making an API call
      console.log('Login attempt with:', {
        email: formData.email,
        password: formData.password
      })

      // Simulate successful login
      console.log('Login successful!')
      router.push('/') // Default redirect

    } catch (err) {
      setError('An error occurred during login')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSocialLogin = (provider) => {
    console.log(`Logging in with ${provider}`)
    // Implement social login logic here
  }

  return (
    <div className="login-page min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="login-container max-w-md w-full space-y-8">
        <LoginForm 
          formData={formData}
          isLoading={isLoading}
          error={error}
          onInputChange={handleInputChange}
          onSubmit={onSubmit}
          onSocialLogin={handleSocialLogin}
        />
      </div>
    </div>
  )
}

'use client'

import { useState } from 'react'
import LoginForm from '../../../components/form/LoginForm'

export default function LoginPage() {
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
      
      // Here you would typically:
      // 1. Save the user data to a global state (Redux, Context, etc.)
      // 2. Save the authentication token if using JWT
      // 3. Redirect to dashboard or home page

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
    <LoginForm 
      formData={formData}
      isLoading={isLoading}
      error={error}
      onInputChange={handleInputChange}
      onSubmit={onSubmit}
      onSocialLogin={handleSocialLogin}
    />
  )
}

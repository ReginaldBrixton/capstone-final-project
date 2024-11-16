'use client'

import { useState } from 'react'
import LoginForm from '@/components/form/LoginForm.jsx'

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
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      console.log('Form submitted with:', formData)
      
      // Simulating an error for demonstration
      throw new Error("Invalid email or password. Please try again.")
      
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

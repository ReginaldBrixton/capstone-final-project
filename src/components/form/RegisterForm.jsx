'use client'

import { useState, useEffect } from 'react'
import { Button } from "./button.tsx"
import { Input } from "./input.tsx"
import { Label } from "./label.tsx"
import { Alert, AlertDescription } from "./alert"
import { Progress } from "./progress"
import Link from "next/link"
import { Loader2 } from 'lucide-react'
import { motion } from "framer-motion"

export default function RegisterForm({ onSubmit: onSubmitProp, className }) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [password, setPassword] = useState('')
  const [passwordStrength, setPasswordStrength] = useState(0)
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    // Simple password strength calculation
    const strength = password.length > 8 ? 
      (password.match(/[A-Z]/) ? 25 : 0) + 
      (password.match(/[a-z]/) ? 25 : 0) + 
      (password.match(/[0-9]/) ? 25 : 0) + 
      (password.match(/[^A-Za-z0-9]/) ? 25 : 0) : 0
    setPasswordStrength(strength)
  }, [password])

  async function handleSubmit(event) {
    event.preventDefault()
    setIsLoading(true)
    setError(null)

    // Collect form data
    const formData = new FormData(event.target)
    const userData = {
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password')
    }

    try {
      await onSubmitProp(userData)
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <motion.div 
      className={`bg-white py-8 px-4 shadow-xl rounded-lg sm:px-10 ${className}`}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="sm:mx-auto sm:w-full sm:max-w-md mb-6">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create your account</h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Join us and start managing your projects
        </p>
      </div>
      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <Label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Full Name
          </Label>
          <div className="mt-1">
            <Input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email address
          </Label>
          <div className="mt-1">
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </Label>
          <div className="mt-1 relative">
            <Input
              id="password"
              name="password" 
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter a strong password"
              className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 sm:text-sm pr-10
                ${password.length > 0 ? 
                  passwordStrength === 100 ? 'border-green-500 focus:border-green-500 focus:ring-green-500' :
                  passwordStrength >= 50 ? 'border-yellow-500 focus:border-yellow-500 focus:ring-yellow-500' :
                  'border-red-500 focus:border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:border-teal-500 focus:ring-teal-500'}`}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              )}
            </button>
          </div>
          {password.length > 0 && (
            <div className="mt-2">
              <Progress 
                value={passwordStrength} 
                className={`h-1 transition-colors duration-300
                  ${passwordStrength === 100 ? 'bg-green-500' : 
                    passwordStrength >= 50 ? 'bg-yellow-500' : 
                    'bg-red-500'}`}
              />
              <div className="flex justify-between items-center mt-2">
                <p className={`text-xs font-medium transition-colors duration-300
                  ${passwordStrength === 100 ? 'text-green-600' : 
                    passwordStrength >= 50 ? 'text-yellow-600' : 
                    'text-red-600'}`}>
                  {passwordStrength === 100 ? 'Strong password' : 
                   passwordStrength >= 50 ? 'Moderate password' : 
                   'Weak password'}
                </p>
                <div className="flex gap-2">
                  <div className="flex items-center gap-1">
                    <span className={`w-2 h-2 rounded-full transition-colors duration-300 ${password.length > 8 ? 'bg-green-500' : 'bg-gray-300'}`}/>
                    <span className="text-xs text-gray-500">8+ chars</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className={`w-2 h-2 rounded-full transition-colors duration-300 ${password.match(/[A-Z]/) ? 'bg-green-500' : 'bg-gray-300'}`}/>
                    <span className="text-xs text-gray-500">Uppercase</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className={`w-2 h-2 rounded-full transition-colors duration-300 ${password.match(/[0-9]/) ? 'bg-green-500' : 'bg-gray-300'}`}/>
                    <span className="text-xs text-gray-500">Number</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className={`w-2 h-2 rounded-full transition-colors duration-300 ${password.match(/[^A-Za-z0-9]/) ? 'bg-green-500' : 'bg-gray-300'}`}/>
                    <span className="text-xs text-gray-500">Symbol</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div>
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-teal-500 to-green-500 hover:from-teal-600 hover:to-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                Creating account...
              </>
            ) : (
              'Create Account'
            )}
          </Button>
        </div>
      </form>

      <div className="mt-2">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">
              <p className="text-center text-sm text-gray-600">
                By clicking continue, you agree to our{" "}
                <Link
                  href="/terms"
                  className="font-medium text-teal-600 hover:text-teal-500 transition-colors duration-200"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy" 
                  className="font-medium text-teal-600 hover:text-teal-500 transition-colors duration-200"
                >
                  Privacy Policy
                </Link>
              </p>
            </span>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <p className="text-sm text-gray-600">
          Already have an account?{' '}
          <Link 
            href="/login" 
            className="font-medium text-teal-600 hover:text-teal-500 inline-flex items-center transition-all duration-200 hover:translate-x-1"
          >
            Sign in
            <svg className="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </p>
      </div>
    </motion.div>
  )
}
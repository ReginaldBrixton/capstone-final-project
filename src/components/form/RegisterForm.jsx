'use client'

import { useState, useEffect } from 'react'
import { Button } from "./button.tsx"
import { Input } from "./input.tsx"
import { Label } from "./label.tsx"
import { Alert, AlertDescription } from "./alert"
import { Progress } from "./progress"
import Link from "next/link"
import { Github, Twitter, Loader2 } from 'lucide-react'
import { motion } from "framer-motion"

export default function RegisterForm({ onSubmit: onSubmitProp, className }) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [password, setPassword] = useState('')
  const [passwordStrength, setPasswordStrength] = useState(0)

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

    try {
      await onSubmitProp(event)
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
          <div className="mt-1">
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
            />
          </div>
          <div className="mt-2">
            <Progress value={passwordStrength} className="h-1" />
            <p className="text-xs text-gray-600 mt-1">
              Password strength: {passwordStrength === 100 ? 'Strong' : passwordStrength >= 50 ? 'Medium' : 'Weak'}
            </p>
          </div>
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

      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or continue with</span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <div>
            <Button
              variant="outline"
              className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <Github className="h-5 w-5 text-gray-700" />
              <span className="sr-only">Sign up with GitHub</span>
            </Button>
          </div>
          <div>
            <Button
              variant="outline"
              className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <Twitter className="h-5 w-5 text-blue-400" />
              <span className="sr-only">Sign up with Twitter</span>
            </Button>
          </div>
        </div>
      </div>

      <p className="mt-8 text-center text-sm text-gray-600">
        Already have an account?{' '}
        <Link href="/login" className="font-medium text-teal-600 hover:text-teal-500">
          Sign in
        </Link>
      </p>
    </motion.div>
  )
}
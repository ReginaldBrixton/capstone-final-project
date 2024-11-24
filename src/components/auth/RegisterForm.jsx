'use client'

import Link from 'next/link'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FormInput, 
  SocialAuthButtons, 
  FormDivider, 
  PasswordStrengthIndicator, 
  PasswordRequirements 
} from './components'
import { Button } from '../ui/button'
import AuthLayout from './layout/AuthLayout'

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [formErrors, setFormErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [showPasswordRequirements, setShowPasswordRequirements] = useState(false);

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 20;
    if (password.match(/[A-Z]/)) strength += 20;
    if (password.match(/[a-z]/)) strength += 20;
    if (password.match(/[0-9]/)) strength += 20;
    if (password.match(/[^A-Za-z0-9]/)) strength += 20;
    return strength;
  }

  const validateField = (name, value) => {
    switch (name) {
      case 'name':
        return value.trim().length < 2 ? 'Name must be at least 2 characters long' : null;
      case 'email':
        return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? 'Please enter a valid email address' : null;
      case 'password':
        if (passwordStrength < 60) {
          return 'Password is too weak';
        }
        return null;
      case 'confirmPassword':
        return value !== formData.password ? 'Passwords do not match' : null;
      default:
        return null;
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (name === 'password') {
      const strength = calculatePasswordStrength(value);
      setPasswordStrength(strength);
    }

    const error = validateField(name, value);
    setFormErrors(prev => ({
      ...prev,
      [name]: error
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Validate all fields
      if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
        throw new Error('Please fill in all fields');
      }

      if (formData.name.trim().length < 2) {
        throw new Error('Name must be at least 2 characters long');
      }

      if (!formData.email.includes('@')) {
        throw new Error('Please enter a valid email address');
      }

      if (passwordStrength < 60) {
        throw new Error('Please choose a stronger password');
      }

      if (formData.password !== formData.confirmPassword) {
        throw new Error('Passwords do not match');
      }

      // Console-based registration logic
      console.log('Registration attempt:', {
        name: formData.name,
        email: formData.email,
        password: formData.password
      });

      // Simulate registration delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      console.log('Registration successful!');
      console.log('Redirecting to login page...');
      
    } catch (err) {
      setError(err.message);
      console.error('Registration error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleRegister = () => {
    console.log('Google registration clicked');
    console.log('This would typically open Google OAuth flow');
  };

  return (
    <AuthLayout>
      <div className="register-form-container">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="register-form-header text-center mb-4 sm:mb-6"
        >
          <h2 className="register-form-title text-xl sm:text-2xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
            Create an account
          </h2>
          <p className="register-form-subtitle mt-2 text-sm text-gray-600 dark:text-gray-400">
            Start your journey with us
          </p>
        </motion.div>

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="register-form-error mb-4 p-3 rounded-lg bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800"
            >
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-red-500 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-xs font-medium text-red-800 dark:text-red-300">{error}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleSubmit} className="register-form space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormInput
              label="Full Name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleInputChange}
              error={formErrors.name}
              disabled={isSubmitting}
              required
              className="register-form-input"
            />

            <FormInput
              label="Email address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              error={formErrors.email}
              disabled={isSubmitting}
              required
              className="register-form-input"
            />
          </div>

          <div className="space-y-2">
            <FormInput
              label="Password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleInputChange}
              error={formErrors.password}
              disabled={isSubmitting}
              required
              className="register-form-input"
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <PasswordStrengthIndicator strength={passwordStrength} className="password-strength-indicator" />
              <PasswordRequirements password={formData.password} className="password-requirements mt-1" />
            </motion.div>
          </div>

          <FormInput
            label="Confirm Password"
            name="confirmPassword"
            type={showPassword ? 'text' : 'password'}
            value={formData.confirmPassword}
            onChange={handleInputChange}
            error={formErrors.confirmPassword}
            disabled={isSubmitting}
            required
            className="register-form-input"
          />

          <Button
            type="submit"
            disabled={isSubmitting}
            className="register-form-submit w-full py-2 text-sm font-medium transition-all duration-300"
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Creating account...</span>
              </div>
            ) : (
              'Create account'
            )}
          </Button>

          <FormDivider text="Or continue with" className="form-divider my-4" />
          
          <SocialAuthButtons 
            onGoogleClick={handleGoogleRegister}
            disabled={isSubmitting}
            className="social-auth-buttons"
          />

          <p className="register-form-footer text-center text-xs text-gray-600 dark:text-gray-400 mt-4">
            Already have an account?{' '}
            <Link 
              href="/login" 
              className="register-form-login-link font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 transition-colors duration-300"
            >
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
}
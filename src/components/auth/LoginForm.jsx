'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FormInput, SocialAuthButtons, FormDivider } from './components';
import { Button } from '../form/button';
import AuthLayout from './layout/AuthLayout';

export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Validate inputs
      if (!formData.email || !formData.password) {
        throw new Error('Please fill in all fields');
      }

      if (!formData.email.includes('@')) {
        throw new Error('Please enter a valid email');
      }

      // Console-based authentication logic
      console.log('Login attempt:', {
        email: formData.email,
        password: formData.password,
        rememberMe
      });

      // Simulate authentication delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      console.log('Login successful!');
      console.log('Redirecting to dashboard...');
      
    } catch (err) {
      setError(err.message);
      console.error('Login error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = () => {
    console.log('Google login clicked');
    console.log('This would typically open Google OAuth flow');
  };

  return (
    <AuthLayout>
      <div id="login-form-container" className="">
        <div id="login-form-header" className="text-center mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Welcome back
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Sign in to your account
          </p>
        </div>

        <AnimatePresence>
          {error && (
            <motion.div
              id="login-error-message"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-4 p-3 rounded-lg bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-sm"
            >
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{error}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <form id="login-form" onSubmit={handleSubmit} className="space-y-6">
          <FormInput
            id="login-email-input"
            label="Email address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            disabled={isSubmitting}
            required
            autoComplete="email"
          />

          <FormInput
            id="login-password-input"
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleInputChange}
            disabled={isSubmitting}
            required
            autoComplete="current-password"
          />

          <div id="login-remember-forgot" className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                id="login-remember-checkbox"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
              <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                Remember me
              </span>
            </label>

            <Link
              id="login-forgot-password-link"
              href="/forgot-password"
              className="text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
            >
              Forgot password?
            </Link>
          </div>

          <Button
            id="login-submit-button"
            type="submit"
            disabled={isSubmitting}
            className="w-full"
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Signing in...</span>
              </div>
            ) : (
              'Sign in'
            )}
          </Button>

          <FormDivider id="login-form-divider" text="Or continue with" />
          
          <SocialAuthButtons
            id="login-social-auth-buttons"
            onGoogleClick={handleGoogleLogin}
            disabled={isSubmitting}
          />

          <p id="login-signup-prompt" className="text-center text-sm text-gray-600 dark:text-gray-400">
            Don't have an account?{' '}
            <Link 
              href="/register" 
              className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
}

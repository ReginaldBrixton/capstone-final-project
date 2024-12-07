'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Lock, Mail } from 'lucide-react';

import styles from '../auth.module.scss';
import { AuthButton, InputField } from '../components';
import { useToast } from '../components/Toast/ToastProvider';
import { validateEmail, validatePassword } from '../utils/validation';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { addToast } = useToast();

  const validateForm = () => {
    const newErrors = {
      email: validateEmail(formData.email),
      password: validatePassword(formData.password),
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Validating form data...', formData);

    if (!validateForm()) {
      console.log('Form validation failed:', errors);
      addToast('Please fix the errors in the form.', 'error');
      return;
    }

    setIsLoading(true);
    try {
      console.log('Attempting login with:', {
        email: formData.email,
        passwordLength: formData.password.length,
      });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log('Login successful!');
      addToast('Successfully logged in!', 'success');
      // Handle successful login here
    } catch (error) {
      console.error('Login failed:', error);
      addToast('Login failed. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    setErrors((prev) => ({
      ...prev,
      [name]: '',
      submit: '',
    }));
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <div className={styles.header}>
          <h2>Welcome back</h2>
          <p>Please sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <InputField
              icon={Mail}
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email address"
              error={errors.email}
            />

            <InputField
              icon={Lock}
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              error={errors.password}
            />
          </div>

          <div className={styles.rememberMe}>
            <div className={styles.checkbox}>
              <input id="remember-me" name="remember-me" type="checkbox" />
              <label htmlFor="remember-me">Remember me</label>
            </div>

            <Link href="/auth/forgot-password" className={styles.forgotPassword}>
              Forgot password?
            </Link>
          </div>

          {errors.submit && <div className={styles.submitError}>{errors.submit}</div>}

          <AuthButton
            type="submit"
            variant="primary"
            isLoading={isLoading}
            disabled={isLoading}
            icon={ArrowRight}
            iconPosition="right"
          >
            {isLoading ? 'Signing in...' : 'Sign in'}
          </AuthButton>

          <div className={styles.alternateAction}>
            <p>
              Don't have an account?{' '}
              <Link href="/auth/register" className={styles.authLink}>
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

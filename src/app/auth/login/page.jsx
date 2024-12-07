'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Lock, Mail } from 'lucide-react';

import AuthButton from '@/components/auth/AuthButton';
import InputField from '@/components/auth/InputField';
import styles from '../auth.module.scss';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login attempt:', formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
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
            />

            <InputField
              icon={Lock}
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
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

          <AuthButton type="submit" variant="primary">
            Sign in
            <ArrowRight size={20} />
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

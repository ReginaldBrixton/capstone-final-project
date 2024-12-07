'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Lock, User } from 'lucide-react';

import styles from '../auth.module.scss';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
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
      <div className={styles.header}>
        <h2>Welcome back</h2>
        <p>Please sign in to your account</p>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <div className={styles.inputWrapper}>
            <div className={styles.icon}>
              <User />
            </div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Email address"
            />
          </div>

          <div className={styles.inputWrapper}>
            <div className={styles.icon}>
              <Lock />
            </div>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Password"
            />
          </div>
        </div>

        <div className={styles.rememberMe}>
          <div className={styles.checkbox}>
            <input id="remember-me" name="remember-me" type="checkbox" />
            <label htmlFor="remember-me">Remember me</label>
          </div>

          <div className={styles.forgotPassword}>
            <a href="#">Forgot your password?</a>
          </div>
        </div>

        <button type="submit" className={styles.submitButton}>
          Sign in
          <ArrowRight />
        </button>

        <div className={styles.alternateAction}>
          <p>
            Don't have an account? <Link href="/auth/register">Sign up</Link>
          </p>
        </div>
      </form>
    </div>
  );
}

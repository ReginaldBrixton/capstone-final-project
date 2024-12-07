'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Lock, Mail, User, UserPlus } from 'lucide-react';

import styles from '../auth.module.scss';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle registration logic here
    console.log('Register attempt:', formData);
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
        <h2>Create your account</h2>
        <p>Join us today and start your journey</p>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <div className={styles.inputWrapper}>
            <div className={styles.icon}>
              <User />
            </div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Full name"
            />
          </div>

          <div className={styles.inputWrapper}>
            <div className={styles.icon}>
              <Mail />
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

          <div className={styles.inputWrapper}>
            <div className={styles.icon}>
              <Lock />
            </div>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              placeholder="Confirm password"
            />
          </div>
        </div>

        <button type="submit" className={styles.submitButton}>
          Create Account
          <UserPlus />
        </button>

        <div className={styles.alternateAction}>
          <p>
            Already have an account? <Link href="/auth/login">Sign in</Link>
          </p>
        </div>
      </form>
    </div>
  );
}

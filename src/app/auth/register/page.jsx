'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Lock, Mail, User, UserPlus } from 'lucide-react';

import styles from '../auth.module.scss';
import { AuthButton, InputField } from '../components';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
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
      <div className={styles.authCard}>
        <div className={styles.header}>
          <h2>Create Account</h2>
          <p>Join us today and start your journey</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <InputField
              icon={User}
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full name"
            />

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

            <InputField
              icon={Lock}
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm password"
            />
          </div>

          <AuthButton type="submit" variant="primary">
            Create Account
            <UserPlus size={20} />
          </AuthButton>

          <div className={styles.alternateAction}>
            <p>
              Already have an account?{' '}
              <Link href="/auth/login" className={styles.authLink}>
                Sign in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

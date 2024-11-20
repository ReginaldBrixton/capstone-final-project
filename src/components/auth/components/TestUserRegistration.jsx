'use client';

import { useState } from 'react';
import { Button } from '../../form/button';

export default function TestUserRegistration() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const createTestUser = async () => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'Test User',
          email: 'test@example.com',
          password: 'Test123!@#',
          role: 'student'
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      setSuccess(true);
      console.log('Test user created:', data);
    } catch (err) {
      setError(err.message);
      console.error('Error creating test user:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Create Test User</h3>
      <p className="text-sm text-gray-600 mb-4">
        This will create a test user with the following credentials:
        <br />
        Email: test@example.com
        <br />
        Password: Test123!@#
      </p>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
          {error}
        </div>
      )}
      
      {success && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md text-sm">
          Test user created successfully! You can now log in with the test credentials.
        </div>
      )}

      <Button
        onClick={createTestUser}
        disabled={isLoading}
        className="w-full"
      >
        {isLoading ? 'Creating...' : 'Create Test User'}
      </Button>
    </div>
  );
}

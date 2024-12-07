'use client';

import { useCallback, useEffect, useState } from 'react';

const TestPage = () => {
  const [mounted, setMounted] = useState(false);
  const [authState, setAuthState] = useState({
    isLoggedIn: false,
    token: '',
    username: '',
    error: '',
  });
  const [sessionState, setSessionState] = useState('');
  const [showRegister, setShowRegister] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  // Add useEffect to handle client-side mounting
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = useCallback(async () => {
    if (authState.token) {
      try {
        await fetch('/api/session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'logout',
            token: authState.token,
          }),
        });
      } catch (error) {
        console.error('Logout error:', error);
      }
    }
    setAuthState({
      isLoggedIn: false,
      token: '',
      username: '',
      error: '',
    });
    setSessionState('');
  }, [authState.token]);

  // Check login status periodically only after mounting
  useEffect(() => {
    if (!mounted) return;

    if (authState.token) {
      const checkStatus = async () => {
        try {
          const response = await fetch('/api/session', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${authState.token}`,
            },
            body: JSON.stringify({
              action: 'checkLoginStatus',
              token: authState.token,
            }),
          });
          const data = await response.json();

          if (!data.isLoggedIn) {
            handleLogout();
          }
        } catch (error) {
          console.error('Status check error:', error);
        }
      };

      const interval = setInterval(checkStatus, 5000);
      return () => clearInterval(interval);
    }
  }, [authState.token, mounted, handleLogout]);

  // If not mounted yet, return null or a loading state
  if (!mounted) {
    return null;
  }

  // Handle form submission (login or register)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const action = showRegister ? 'register' : 'login';

    try {
      const response = await fetch('/api/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action,
          username: formData.username,
          password: formData.password,
        }),
      });
      const data = await response.json();

      if (response.ok) {
        if (showRegister) {
          // After successful registration, switch to login
          setShowRegister(false);
          setAuthState((prev) => ({
            ...prev,
            error: '',
            message: 'Registration successful! Please login.',
          }));
        } else {
          // Handle successful login
          setAuthState({
            isLoggedIn: true,
            token: data.token,
            username: data.username,
            error: '',
          });
        }
        setFormData({ username: '', password: '' });
      } else {
        setAuthState((prev) => ({ ...prev, error: data.error }));
      }
    } catch (error) {
      setAuthState((prev) => ({
        ...prev,
        error: showRegister ? 'Registration failed' : 'Login failed',
      }));
    }
  };

  // Handle state updates
  const handleStateUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authState.token}`,
        },
        body: JSON.stringify({
          action: 'setState',
          token: authState.token,
          state: sessionState,
        }),
      });
      const data = await response.json();

      if (!response.ok) {
        setAuthState((prev) => ({ ...prev, error: data.error }));
      }
    } catch (error) {
      setAuthState((prev) => ({ ...prev, error: 'Failed to update state' }));
    }
  };

  // Fetch current state
  const fetchState = async () => {
    try {
      const response = await fetch('/api/session', {
        headers: {
          Authorization: `Bearer ${authState.token}`,
        },
      });
      const data = await response.json();

      if (response.ok) {
        setSessionState(data.state);
      }
    } catch (error) {
      console.error('Error fetching state:', error);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h1 className="text-2xl font-bold mb-6">Session Management Test</h1>

      {authState.error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {authState.error}
        </div>
      )}

      {authState.message && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {authState.message}
        </div>
      )}

      {!authState.isLoggedIn ? (
        <div>
          <div className="flex justify-between mb-4">
            <button
              onClick={() => setShowRegister(false)}
              className={`flex-1 py-2 mr-2 rounded ${!showRegister ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              Login
            </button>
            <button
              onClick={() => setShowRegister(true)}
              className={`flex-1 py-2 ml-2 rounded ${showRegister ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              Register
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1">Username:</label>
              <input
                type="text"
                value={formData.username}
                onChange={(e) => setFormData((prev) => ({ ...prev, username: e.target.value }))}
                className="w-full p-2 border rounded"
                required
                minLength={3}
                maxLength={20}
              />
            </div>
            <div>
              <label className="block mb-1">Password:</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
                className="w-full p-2 border rounded"
                required
                minLength={6}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            >
              {showRegister ? 'Register' : 'Login'}
            </button>
          </form>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <p>Welcome, {authState.username}!</p>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </div>

          <div className="border-t pt-4">
            <form onSubmit={handleStateUpdate} className="space-y-4">
              <div>
                <label className="block mb-1">Session State:</label>
                <input
                  type="text"
                  value={sessionState}
                  onChange={(e) => setSessionState(e.target.value)}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="flex space-x-2">
                <button
                  type="submit"
                  className="flex-1 bg-green-500 text-white py-2 rounded hover:bg-green-600"
                >
                  Update State
                </button>
                <button
                  type="button"
                  onClick={fetchState}
                  className="flex-1 bg-gray-500 text-white py-2 rounded hover:bg-gray-600"
                >
                  Fetch State
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestPage;

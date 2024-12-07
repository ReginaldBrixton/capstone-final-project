import { NextResponse } from 'next/server';

import { addUser, logoutUser, storage, updateUserActivity } from './storage';
import { getClientIP } from './utils';

// Handle user registration
export async function handleRegister({ username, password, email }, ip) {
  if (storage.users.has(username)) {
    return NextResponse.json({ error: 'Username already exists' }, { status: 400 });
  }

  if (email && storage.userEmails.has(email)) {
    return NextResponse.json({ error: 'Email already registered' }, { status: 400 });
  }

  try {
    const newUser = addUser(username, password, email, ip);
    return NextResponse.json({
      message: 'Registration successful',
      username: newUser.username,
      email: newUser.email,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Registration failed' }, { status: 500 });
  }
}

// Handle user login
export async function handleLogin({ username, password }, ip) {
  const user = storage.users.get(username);
  const isValidCredentials = user && user.passwordHash === password;

  if (!isValidCredentials) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  // Update user activity and login status
  updateUserActivity(username, ip);

  return NextResponse.json({
    message: 'Login successful',
    username: user.username,
    email: user.email,
    lastActivity: user.lastActivity,
    location: user.lastLocation,
  });
}

// Handle user logout
export async function handleLogout({ username }) {
  logoutUser(username);
  return NextResponse.json({
    message: 'Logged out successfully',
    timestamp: new Date().toISOString(),
  });
}

// Check user status
export async function handleCheckStatus({ username }) {
  const user = storage.users.get(username);

  if (!user) {
    return NextResponse.json(
      {
        error: 'User not found',
      },
      { status: 404 }
    );
  }

  return NextResponse.json({
    username: user.username,
    email: user.email,
    isLoggedIn: user.isLoggedIn,
    lastActivity: user.lastActivity,
    location: user.lastLocation,
  });
}

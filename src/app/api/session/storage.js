import { randomBytes } from 'crypto';

/**
 * Simplified storage for user sessions and data
 */
export const storage = {
  // User account information with their sessions
  users: new Map(), // stores user details by username
  userEmails: new Map(), // email to username mapping
  sessions: new Map(), // stores active sessions by userId
};

export function addUser(username, passwordHash, email = '', ip = '') {
  const timestamp = Date.now();
  const randomId = Math.random().toString(36).substring(2, 10);
  const userId = `user_${timestamp}_${randomId}`;
  const newUser = {
    id: userId,
    username,
    email,
    passwordHash,
    isLoggedIn: false,
    lastActivity: null,
    loginHistory: [], // stores login timestamps
    lastLocation: ip,
    createdAt: new Date().toISOString(),
  };

  storage.users.set(username, newUser);
  if (email) {
    storage.userEmails.set(email, username);
  }
  return newUser;
}

export function updateUserActivity(username, ip = '') {
  const user = storage.users.get(username);
  if (user) {
    user.lastActivity = new Date().toISOString();
    user.loginHistory.push(user.lastActivity);
    user.lastLocation = ip;
    user.isLoggedIn = true;
    storage.users.set(username, user);
  }
}

export function logoutUser(username) {
  const user = storage.users.get(username);
  if (user) {
    user.isLoggedIn = false;
    storage.users.set(username, user);
    storage.sessions.delete(user.id);
  }
}

export function clearAllUserSessions() {
  // Clear all active sessions but keep user data
  storage.sessions.clear();
  storage.users.forEach((user) => {
    user.isLoggedIn = false;
    storage.users.set(user.username, user);
  });
}

export function clearEverything() {
  storage.users.clear();
  storage.userEmails.clear();
  storage.sessions.clear();
}

// Initialize with one test user
addUser('testuser', 'hashed_password_here', 'test@example.com', '127.0.0.1');

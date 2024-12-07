import crypto from 'crypto';

import { CONFIG } from './config';
import { storage } from './storage';

/**
 * Get the client's IP address from the request headers
 */
export function getClientIP(request) {
  return (
    request.headers.get('x-forwarded-for') ||
    request.headers.get('x-real-ip') ||
    request.socket?.remoteAddress ||
    'unknown'
  );
}

/**
 * Check if the client has exceeded their rate limit
 * Returns true if under limit, false if exceeded
 */
export function checkRateLimit(ip) {
  const now = Date.now();
  let rateLimit = storage.rateLimits.get(ip);

  // Reset rate limit if expired or doesn't exist
  const isNewOrExpired = !rateLimit || now > rateLimit.windowStart + CONFIG.RATE_LIMIT_WINDOW;

  if (isNewOrExpired) {
    rateLimit = {
      windowStart: now,
      count: 0,
    };
  }

  // Increment request count
  rateLimit.count++;
  storage.rateLimits.set(ip, rateLimit);

  // Check if under max requests
  return rateLimit.count <= CONFIG.MAX_REQUESTS_PER_WINDOW;
}

/**
 * Validate the format and content of a state string
 * Throws error if invalid, returns true if valid
 */
export function validateState(state) {
  // Check type
  if (typeof state !== 'string') {
    throw new Error('State must be a string');
  }

  // Check length
  if (state.length > CONFIG.MAX_STATE_LENGTH) {
    throw new Error(`State length must not exceed ${CONFIG.MAX_STATE_LENGTH} characters`);
  }

  // Check allowed characters
  const validChars = /^[a-zA-Z0-9\s\-_.,!?@#$%^&*()]+$/;
  if (!validChars.test(state)) {
    throw new Error('State contains invalid characters');
  }

  return true;
}

/**
 * Generate a random hex token for authentication
 */
// export function generateToken() {
//   return crypto.randomBytes(CONFIG.TOKEN_LENGTH).toString('hex');
// }

export function generateToken() {
  const array = new Uint8Array(CONFIG.TOKEN_LENGTH);
  crypto.getRandomValues(array);
  return Array.from(array, (byte) => byte.toString(16).padStart(2, '0')).join('');
}
/**
 * Verify a token and update user activity
 * Returns userId if valid, null if invalid/expired
 */
export function verifyToken(token) {
  const tokenData = storage.tokens.get(token);

  // Return null if token not found
  if (!tokenData) {
    return null;
  }

  // Check if token is expired
  const isExpired = Date.now() > tokenData.expiresAt;
  if (isExpired) {
    // Clean up expired token
    const user = [...storage.users.values()].find((user) => user.id === tokenData.userId);

    if (user) {
      user.isActive = false;
      storage.activeLogins.delete(user.id);
    }

    storage.tokens.delete(token);
    return null;
  }

  // Update user's last activity time
  storage.activeLogins.set(tokenData.userId, Date.now());

  return tokenData.userId;
}

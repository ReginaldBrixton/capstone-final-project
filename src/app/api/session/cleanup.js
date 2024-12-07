import { CONFIG } from './config';
import { storage } from './storage';

/**
 * Deactivates a user and removes their active login status
 * @param {string} userId - The ID of the user to deactivate
 */
function deactivateUser(userId) {
  const user = [...storage.users.values()].find((user) => user.id === userId);
  if (user) {
    user.isActive = false;
    storage.activeLogins.delete(userId);
  }
}

/**
 * Checks if a timestamp has expired based on a duration
 * @param {number} timestamp - The timestamp to check
 * @param {number} duration - The duration in milliseconds
 * @returns {boolean} True if expired, false otherwise
 */
function isExpired(timestamp, duration) {
  const currentTime = Date.now();
  return currentTime > timestamp + duration;
}

/**
 * Starts an interval to clean up expired sessions, rate limits, tokens and inactive users
 */
export function startCleanupInterval() {
  const CLEANUP_INTERVAL = 60000; // Run every minute

  setInterval(() => {
    // Clean up expired user sessions
    cleanupExpiredSessions();

    // Clean up expired rate limiting data
    cleanupExpiredRateLimits();

    // Clean up expired authentication tokens
    cleanupExpiredTokens();

    // Clean up expired login attempt blocks
    cleanupExpiredLoginBlocks();

    // Clean up inactive user sessions
    cleanupInactiveUsers();
  }, CLEANUP_INTERVAL);
}

// Helper functions to break down the cleanup tasks
function cleanupExpiredSessions() {
  storage.sessions.forEach((session, sessionId) => {
    if (Date.now() > session.expiresAt) {
      storage.sessions.delete(sessionId);
      if (session.userId) {
        deactivateUser(session.userId);
      }
    }
  });
}

function cleanupExpiredRateLimits() {
  storage.rateLimits.forEach((limit, ip) => {
    if (isExpired(limit.windowStart, CONFIG.RATE_LIMIT_WINDOW)) {
      storage.rateLimits.delete(ip);
    }
  });
}

function cleanupExpiredTokens() {
  storage.tokens.forEach((tokenData, token) => {
    if (Date.now() > tokenData.expiresAt) {
      deactivateUser(tokenData.userId);
      storage.tokens.delete(token);
    }
  });
}

function cleanupExpiredLoginBlocks() {
  storage.loginAttempts.forEach((attempts, ip) => {
    if (attempts.blockUntil && Date.now() > attempts.blockUntil) {
      storage.loginAttempts.delete(ip);
    }
  });
}

function cleanupInactiveUsers() {
  storage.activeLogins.forEach((lastActivity, userId) => {
    if (isExpired(lastActivity, CONFIG.LOGIN_CHECK_INTERVAL)) {
      deactivateUser(userId);
    }
  });
}

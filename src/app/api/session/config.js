// Time constants in milliseconds
const MINUTE = 60 * 1000;
const MINUTES_15 = 15 * MINUTE;
const MINUTES_30 = 30 * MINUTE;
const MINUTES_5 = 5 * MINUTE;

export const CONFIG = {
  // Session configuration
  // Maximum number of concurrent sessions allowed
  MAX_SESSIONS: 1000,

  // Session time-to-live: how long a session remains valid
  SESSION_TTL: MINUTES_30,

  // Maximum length of session state data
  MAX_STATE_LENGTH: 1000,

  // Rate limiting configuration
  // Time window for rate limiting in milliseconds
  RATE_LIMIT_WINDOW: MINUTE,

  // Maximum number of requests allowed per time window
  MAX_REQUESTS_PER_WINDOW: 100,

  // Authentication configuration
  // Length of authentication tokens
  TOKEN_LENGTH: 32,

  // Maximum failed login attempts before blocking
  MAX_LOGIN_ATTEMPTS: 5,

  // Duration to block login attempts after max failures
  LOGIN_BLOCK_DURATION: MINUTES_15,

  // Number of salt rounds for password hashing
  PASSWORD_SALT_ROUNDS: 10,

  // Interval to check login status
  LOGIN_CHECK_INTERVAL: MINUTES_5,
};

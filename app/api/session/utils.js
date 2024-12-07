/**
 * Generate a random hex token for authentication
 */
export function generateToken() {
  const array = new Uint8Array(CONFIG.TOKEN_LENGTH);
  crypto.getRandomValues(array);
  return Array.from(array, (byte) => byte.toString(16).padStart(2, '0')).join('');
}

import { clearAllUserSessions, clearEverything, storage } from './storage';

export function clearAllSessions() {
  clearAllUserSessions();
  return {
    message: 'All sessions cleared successfully',
    timestamp: new Date().toISOString(),
  };
}

export function clearAll() {
  clearEverything();
  return {
    message: 'All data cleared successfully',
    timestamp: new Date().toISOString(),
  };
}

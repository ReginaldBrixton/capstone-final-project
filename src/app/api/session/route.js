import { NextResponse } from 'next/server';

import { handleCheckStatus, handleLogin, handleLogout, handleRegister } from './handlers';
import { clearAll, clearAllSessions } from './sessionManager';
import { getClientIP } from './utils';

export async function POST(request) {
  try {
    const ip = getClientIP(request);
    const { action, ...data } = await request.json();

    switch (action) {
      case 'register':
        return handleRegister(data, ip);
      case 'login':
        return handleLogin(data, ip);
      case 'logout':
        return handleLogout(data);
      case 'checkStatus':
        return handleCheckStatus(data);
      case 'clearSessions':
        return NextResponse.json(clearAllSessions());
      case 'clearAll':
        return NextResponse.json(clearAll());
      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }
  } catch (error) {
    console.error('POST Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    const username = request.headers.get('username');
    return handleCheckStatus({ username });
  } catch (error) {
    console.error('GET Error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

/**
 * Handles CORS preflight requests
 * Sets appropriate headers for cross-origin requests
 */
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400',
    },
  });
}

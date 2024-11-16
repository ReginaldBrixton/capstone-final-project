import { authenticateUser } from '@/utils/auth';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { username, password } = await request.json();
    
    const auth = authenticateUser(username, password);
    
    if (auth) {
      return NextResponse.json({
        user: auth.user,
        token: auth.token
      });
    }
    
    return NextResponse.json(
      { error: 'Invalid credentials' },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 
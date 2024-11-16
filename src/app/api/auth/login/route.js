import { NextResponse } from 'next/server';
import { readFileSync } from 'fs';
import { join } from 'path';
import path from 'path';

// Read users data at module level
const usersFilePath = path.join(process.cwd(), 'src', 'utils', 'users.json');
const usersData = JSON.parse(readFileSync(usersFilePath, 'utf8'));

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Find user in database
    const user = usersData.roles.find(user => user.email === email);

    // Check if user exists and password matches
    if (!user || user.password !== password) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Create safe user object (without password)
    const safeUser = {
      name: user.name,
      email: user.email,
      role: user.role,
      permissions: user.permissions
    };

    // In a real application, you would:
    // 1. Hash passwords (never store plain text passwords)
    // 2. Use JWT or sessions for authentication
    // 3. Implement proper security measures

    return NextResponse.json({
      message: 'Login successful',
      user: safeUser
    });

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

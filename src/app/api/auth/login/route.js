import { NextResponse } from 'next/server';
import { auth, db } from '../../../../lib/firebase/admin';

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

    try {
      // Verify the Firebase ID token
      const userRecord = await auth.getUserByEmail(email);
      
      // Get additional user data from Firestore
      const userDoc = await db.collection('users').doc(userRecord.uid).get();
      const userData = userDoc.data();

      if (!userData) {
        return NextResponse.json(
          { error: 'User profile not found' },
          { status: 404 }
        );
      }

      // Create safe user object
      const safeUser = {
        uid: userRecord.uid,
        email: userRecord.email,
        name: userData.name,
        role: userData.role || 'student',
        permissions: userData.permissions || {}
      };

      return NextResponse.json({
        message: 'Login successful',
        user: safeUser
      });

    } catch (authError) {
      console.error('Authentication error:', authError);
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

import { NextResponse } from 'next/server';
import admin from 'firebase-admin';
import { join } from 'path';
import { readFileSync } from 'fs';

// Initialize Firebase Admin if not already initialized
if (!admin.apps.length) {
  try {
    const serviceAccount = JSON.parse(
      readFileSync(
        join(process.cwd(), 'ait-capstone-application-firebase-adminsdk-uk8z1-84e1c0f584.json'),
        'utf8'
      )
    );
    
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  } catch (error) {
    console.error('Firebase admin initialization error:', error);
  }
}

// List users
export async function GET(request) {
  try {
    const listUsersResult = await admin.auth().listUsers();
    const users = listUsersResult.users.map(user => ({
      id: user.uid,
      email: user.email,
      role: user.customClaims?.role || 'student',
      disabled: user.disabled
    }));
    return NextResponse.json({ users });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Create user
export async function POST(request) {
  try {
    const { email, password, role } = await request.json();
    const userRecord = await admin.auth().createUser({
      email,
      password,
    });
    
    // Set custom claims for role
    await admin.auth().setCustomUserClaims(userRecord.uid, { role });
    
    return NextResponse.json({ user: userRecord });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Update user
export async function PUT(request) {
  try {
    const { uid, updates } = await request.json();
    const userRecord = await admin.auth().updateUser(uid, updates);
    
    if (updates.role) {
      await admin.auth().setCustomUserClaims(uid, { role: updates.role });
    }
    
    return NextResponse.json({ user: userRecord });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Delete user
export async function DELETE(request) {
  try {
    const { uid } = await request.json();
    await admin.auth().deleteUser(uid);
    return NextResponse.json({ message: 'User deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

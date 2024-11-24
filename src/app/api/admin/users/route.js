import { NextResponse } from 'next/server';
import { auth, db } from '../../../../lib/firebase/admin';

// List users
export async function GET(request) {
  try {
    // Get users from Firebase Auth
    const listUsersResult = await auth.listUsers();
    const users = await Promise.all(listUsersResult.users.map(async user => {
      // Get additional user data from Firestore
      const userDoc = await db.collection('users').doc(user.uid).get();
      const userData = userDoc.exists ? userDoc.data() : {};
      
      return {
        ...user,
        ...userData
      };
    }));

    return NextResponse.json({ users });
  } catch (error) {
    console.error('Error listing users:', error);
    return NextResponse.json(
      { error: 'Failed to list users' },
      { status: 500 }
    );
  }
}

// Create user
export async function POST(request) {
  try {
    const { email, password, displayName, role = 'student' } = await request.json();

    // Create user in Firebase Auth
    const userRecord = await auth.createUser({
      email,
      password,
      displayName,
    });

    // Create user document in Firestore
    await db.collection('users').doc(userRecord.uid).set({
      email,
      displayName,
      role,
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({ 
      success: true,
      user: userRecord 
    });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 400 }
    );
  }
}

// Update user
export async function PUT(request) {
  try {
    const { uid, ...updateData } = await request.json();

    // Update user in Firebase Auth
    const userRecord = await auth.updateUser(uid, updateData);

    // Update user document in Firestore if it exists
    const userDoc = db.collection('users').doc(uid);
    const doc = await userDoc.get();
    
    if (doc.exists) {
      await userDoc.update({
        ...updateData,
        updatedAt: new Date().toISOString(),
      });
    }

    return NextResponse.json({ 
      success: true,
      user: userRecord 
    });
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 400 }
    );
  }
}

// Delete user
export async function DELETE(request) {
  try {
    const { uid } = await request.json();

    // Delete user from Firebase Auth
    await auth.deleteUser(uid);

    // Delete user document from Firestore
    await db.collection('users').doc(uid).delete();

    return NextResponse.json({ 
      success: true,
      message: 'User deleted successfully' 
    });
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 400 }
    );
  }
}

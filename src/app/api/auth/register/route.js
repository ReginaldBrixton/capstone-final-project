import { auth, db } from '../../../../lib/firebase/admin';
import { NextResponse } from 'next/server';

// Helper function to get user-friendly error messages
function getAuthErrorMessage(errorCode) {
  switch (errorCode) {
    case 'auth/email-already-exists':
      return 'This email is already registered. Please try logging in instead.';
    case 'auth/invalid-email':
      return 'The email address is not valid.';
    case 'auth/operation-not-allowed':
      return 'Email/password accounts are not enabled. Please contact support.';
    case 'auth/weak-password':
      return 'The password is too weak. Please use a stronger password.';
    default:
      return `Registration error: ${errorCode}`;
  }
}

// Helper function to get default permissions based on role
function getRolePermissions(role) {
  const basePermissions = {
    canViewOwnProfile: true,
    canEditOwnProfile: true,
  };

  switch (role) {
    case 'admin':
      return {
        ...basePermissions,
        canManageUsers: true,
        canManageRoles: true,
        canManageProjects: true,
        canViewAllProjects: true,
        canEditAllProjects: true,
        canViewAllSubmissions: true,
        canGradeSubmissions: true,
      };
    case 'supervisor':
      return {
        ...basePermissions,
        canViewAssignedProjects: true,
        canEditAssignedProjects: true,
        canViewAssignedSubmissions: true,
        canGradeAssignedSubmissions: true,
        canProvideFeedback: true,
      };
    case 'student':
    default:
      return {
        ...basePermissions,
        canCreateProjects: true,
        canEditOwnProjects: true,
        canCreateSubmissions: true,
        canViewOwnProjects: true,
        canViewOwnSubmissions: true,
      };
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, password, role = 'student' } = body;

    // Input validation
    if (!email || !password) {
      return NextResponse.json(
        { error: { message: 'Email and password are required', level: 'error' } },
        { status: 400 }
      );
    }

    if (!name || name.trim().length < 2) {
      return NextResponse.json(
        { error: { message: 'Name must be at least 2 characters long', level: 'error' } },
        { status: 400 }
      );
    }

    // Check if user already exists in Firestore
    const userQuery = await db.collection('users').where('email', '==', email).get();
    if (!userQuery.empty) {
      return NextResponse.json(
        { error: { message: 'This email is already registered. Please try logging in instead.', level: 'error' } },
        { status: 409 }
      );
    }

    // Create user with Firebase Admin SDK
    let userRecord;
    try {
      userRecord = await auth.createUser({
        email,
        password,
        displayName: name,
      });
    } catch (error) {
      console.error('Firebase Auth Error:', error);
      return NextResponse.json(
        { error: { message: getAuthErrorMessage(error.code), level: 'error' } },
        { status: 400 }
      );
    }

    // Create user profile in Firestore
    const userProfile = {
      uid: userRecord.uid,
      email,
      name,
      role,
      permissions: getRolePermissions(role),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    try {
      await db.collection('users').doc(userRecord.uid).set(userProfile);
    } catch (error) {
      // If Firestore creation fails, delete the Auth user to maintain consistency
      console.error('Firestore Error:', error);
      try {
        await auth.deleteUser(userRecord.uid);
      } catch (deleteError) {
        console.error('Failed to cleanup Auth user after Firestore error:', deleteError);
      }
      return NextResponse.json(
        { error: { message: 'Failed to create user profile. Please try again.', level: 'error' } },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: 'User registered successfully',
      user: {
        uid: userRecord.uid,
        email: userRecord.email,
        name: userRecord.displayName,
        role,
      },
    });

  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { 
        error: { 
          message: 'Registration failed. Please try again later.',
          level: 'error'
        } 
      },
      { status: 500 }
    );
  }
}
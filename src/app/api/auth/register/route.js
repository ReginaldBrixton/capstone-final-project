import { auth, db } from '../../../../lib/firebase/config';
import { doc, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword, deleteUser } from 'firebase/auth';
import { NextResponse } from 'next/server';

// Helper function to get user-friendly error messages
function getAuthErrorMessage(errorCode) {
  switch (errorCode) {
    case 'auth/email-already-in-use':
      return 'This email is already registered. Please try logging in or use a different email.';
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

export async function POST(request) {
  let createdUser = null;

  try {
    const body = await request.json();
    const { name, email, password, phoneNumber, authMethod } = body;

    if (!authMethod) {
      return NextResponse.json({ error: 'Authentication method is required' }, { status: 400 });
    }

    try {
      switch (authMethod) {
        case 'email':
          if (!email || !password) {
            return NextResponse.json({ error: 'Email and password are required for email registration' }, { status: 400 });
          }
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          createdUser = userCredential.user;
          break;
        case 'google':
          createdUser = request.user;
          break;
        default:
          return NextResponse.json({ error: `Unsupported authentication method: ${authMethod}` }, { status: 400 });
      }
    } catch (authError) {
      console.error('Authentication error:', authError);
      return NextResponse.json({ error: getAuthErrorMessage(authError.code) }, { status: 400 });
    }

    if (!createdUser) {
      return NextResponse.json({ error: 'User creation failed' }, { status: 400 });
    }

    try {
      // Create user profile in Firestore
      const userProfile = {
        name: name || '',
        email: email || createdUser.email || '',
        role: 'student',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        uid: createdUser.uid,
        authMethod
      };

      await setDoc(doc(db, 'users', createdUser.uid), userProfile);

      return NextResponse.json({ 
        success: true, 
        user: {
          uid: createdUser.uid,
          email: userProfile.email,
          name: userProfile.name,
          role: userProfile.role,
          authMethod
        },
        redirect: authMethod === 'email' ? '/login' : '/student'
      });

    } catch (firestoreError) {
      console.error('Firestore error:', firestoreError);

      // Clean up auth user if Firestore fails
      if (createdUser) {
        try {
          await deleteUser(createdUser);
        } catch (deleteError) {
          console.error('Error deleting user after Firestore failure:', deleteError);
        }
      }

      return NextResponse.json({ error: 'Failed to create user profile' }, { status: 500 });
    }
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
import { auth, db } from '../../../../lib/firebase/config';
import { doc, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword, deleteUser } from 'firebase/auth';

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
      throw new Error('Authentication method is required');
    }

    try {
      switch (authMethod) {
        case 'email':
          if (!email || !password) {
            throw new Error('Email and password are required for email registration');
          }
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          createdUser = userCredential.user;
          break;
        case 'phone':
          if (!phoneNumber) {
            throw new Error('Phone number is required for phone registration');
          }
          createdUser = request.user;
          break;
        case 'google':
          createdUser = request.user;
          break;
        default:
          throw new Error(`Unsupported authentication method: ${authMethod}`);
      }
    } catch (authError) {
      console.error('Authentication error:', authError);
      throw new Error(getAuthErrorMessage(authError.code));
    }

    if (!createdUser) {
      throw new Error('User creation failed');
    }

    try {
      // Create user profile in Firestore
      const userProfile = {
        name: name || '',
        email: email || createdUser.email || '',
        role: 'student',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        uid: createdUser.uid
      };

      if (phoneNumber || createdUser.phoneNumber) {
        userProfile.phoneNumber = phoneNumber || createdUser.phoneNumber;
      }

      await setDoc(doc(db, 'users', createdUser.uid), userProfile);

      return new Response(JSON.stringify({ 
        success: true, 
        user: {
          uid: createdUser.uid,
          email: userProfile.email,
          name: userProfile.name
        }
      }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (firestoreError) {
      console.error('Firestore error:', firestoreError);

      // Clean up auth user if Firestore fails
      if (createdUser) {
        try {
          await deleteUser(createdUser);
        } catch (deleteError) {
          console.error('Error deleting auth user:', deleteError);
        }
      }

      throw new Error('Failed to create user profile. Please try again later.');
    }
  } catch (error) {
    console.error('Registration error:', error);

    // Clean up auth user if there's an unhandled error
    if (createdUser && error.message !== 'Failed to create user profile. Please try again later.') {
      try {
        await deleteUser(createdUser);
      } catch (deleteError) {
        console.error('Error deleting auth user during cleanup:', deleteError);
      }
    }

    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message
    }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
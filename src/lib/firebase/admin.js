import admin from 'firebase-admin';

function formatPrivateKey(key) {
  if (!key) {
    throw new Error('FIREBASE_ADMIN_PRIVATE_KEY is not set in environment variables');
  }
  // Remove any extra quotes around the key
  key = key.replace(/^["']|["']$/g, '');
  // Replace literal \n with newlines if they exist
  return key.replace(/\\n/g, '\n');
}

if (!admin.apps.length) {
  try {
    const privateKey = formatPrivateKey(process.env.FIREBASE_ADMIN_PRIVATE_KEY);
    
    if (!process.env.FIREBASE_ADMIN_PROJECT_ID) {
      throw new Error('FIREBASE_ADMIN_PROJECT_ID is not set in environment variables');
    }
    if (!process.env.FIREBASE_ADMIN_CLIENT_EMAIL) {
      throw new Error('FIREBASE_ADMIN_CLIENT_EMAIL is not set in environment variables');
    }

    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
        clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
        privateKey,
      }),
    });
  } catch (error) {
    console.error('Firebase admin initialization error:', error);
    throw new Error('Failed to initialize Firebase Admin: ' + error.message);
  }
}

const auth = admin.auth();
const db = admin.firestore();

export { auth, db };
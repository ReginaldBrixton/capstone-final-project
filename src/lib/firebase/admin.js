import admin from 'firebase-admin';
import { join } from 'path';
import { readFileSync } from 'fs';

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
    throw new Error('Failed to initialize Firebase Admin. Check your service account configuration.');
  }
}

const auth = admin.auth();
const db = admin.firestore();

export { auth, db };
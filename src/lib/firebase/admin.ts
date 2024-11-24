import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

const firebaseAdminConfig = {
  projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
  clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n'),
};

function initAdmin() {
  try {
    if (!firebaseAdminConfig.projectId) throw new Error('FIREBASE_ADMIN_PROJECT_ID is not defined');
    if (!firebaseAdminConfig.clientEmail) throw new Error('FIREBASE_ADMIN_CLIENT_EMAIL is not defined');
    if (!firebaseAdminConfig.privateKey) throw new Error('FIREBASE_ADMIN_PRIVATE_KEY is not defined');

    if (getApps().length === 0) {
      initializeApp({
        credential: cert(firebaseAdminConfig),
      });
    }
  } catch (error) {
    console.error('Firebase admin initialization error:', error);
    throw error;
  }
}

initAdmin();

export const auth = getAuth();
export const db = getFirestore(); 
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

const firebaseAdminConfig = {
  projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
  clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n'),
};

console.log('Environment variables check:', {
  projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
  hasClientEmail: !!process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
  hasPrivateKey: !!process.env.FIREBASE_ADMIN_PRIVATE_KEY,
});

function initAdmin() {
  try {
    if (!firebaseAdminConfig.projectId) throw new Error('FIREBASE_ADMIN_PROJECT_ID is not defined');
    if (!firebaseAdminConfig.clientEmail) throw new Error('FIREBASE_ADMIN_CLIENT_EMAIL is not defined');
    if (!firebaseAdminConfig.privateKey) throw new Error('FIREBASE_ADMIN_PRIVATE_KEY is not defined');

    if (getApps().length === 0) {
      const certConfig = {
        projectId: firebaseAdminConfig.projectId,
        clientEmail: firebaseAdminConfig.clientEmail,
        privateKey: firebaseAdminConfig.privateKey,
      };

      // Log the config for debugging (remove in production)
      console.log('Firebase Admin Config:', {
        projectId: certConfig.projectId,
        clientEmail: certConfig.clientEmail,
        privateKeyLength: certConfig.privateKey?.length,
      });

      initializeApp({
        credential: cert(certConfig),
      });
    }
  } catch (error) {
    console.error('Firebase admin initialization error:', error);
    // Log the actual config values for debugging (remove in production)
    console.error('Config values:', {
      projectId: firebaseAdminConfig.projectId,
      clientEmail: firebaseAdminConfig.clientEmail,
      privateKeyExists: !!firebaseAdminConfig.privateKey,
    });
    throw error;
  }
}

initAdmin();

export const auth = getAuth();
export const db = getFirestore(); 
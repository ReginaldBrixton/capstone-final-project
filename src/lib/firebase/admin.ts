import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

const firebaseAdminConfig = {
  projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
  clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY,
};

function initAdmin() {
  if (getApps().length === 0) {
    initializeApp({
      credential: cert(firebaseAdminConfig),
    });
  }
}

initAdmin();

export const auth = getAuth();
export const db = getFirestore(); 
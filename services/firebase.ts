import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

/**
 * Safely access environment variables in the browser.
 * This prevents "ReferenceError: process is not defined" which causes blank pages.
 */
const getEnv = (key: string): string | undefined => {
  try {
    // Check if process and process.env exist before accessing
    return typeof process !== 'undefined' && process.env ? process.env[key] : undefined;
  } catch {
    return undefined;
  }
};

const firebaseConfig = {
  apiKey: getEnv('REACT_APP_FIREBASE_API_KEY') || "demo-key",
  authDomain: getEnv('REACT_APP_FIREBASE_AUTH_DOMAIN') || "demo.firebaseapp.com",
  projectId: getEnv('REACT_APP_FIREBASE_PROJECT_ID') || "demo-project",
  storageBucket: getEnv('REACT_APP_FIREBASE_STORAGE_BUCKET') || "demo.appspot.com",
  messagingSenderId: getEnv('REACT_APP_FIREBASE_SENDER_ID') || "123456789",
  appId: getEnv('REACT_APP_FIREBASE_APP_ID') || "1:123456:web:123456"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
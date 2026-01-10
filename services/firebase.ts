import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// NOTE: In a production environment, these values must come from process.env
// For this demo generation, we provide the structure.
// The DataService will fallback to mock data if these are invalid.

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "demo-key",
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "demo.firebaseapp.com",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "demo-project",
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "demo.appspot.com",
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID || "123456789",
  appId: process.env.REACT_APP_FIREBASE_APP_ID || "1:123456:web:123456"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
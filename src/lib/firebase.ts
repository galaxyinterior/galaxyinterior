import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

// Firebase client configuration
// NOTE: These are client-side public keys (not secret credentials).
// Move to environment variables for multi-environment support.
const firebaseConfig = {
  apiKey: 'AIzaSyDb2ag6LLlWe4KHv55i8aLEgVlWbyzBbnI',
  authDomain: 'galaxy-interior.firebaseapp.com',
  databaseURL: 'https://galaxy-interior-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'galaxy-interior',
  storageBucket: 'galaxy-interior.firebasestorage.app',
  messagingSenderId: '230292492490',
  appId: '1:230292492490:web:6dce7f3b67865286be6433',
  measurementId: 'G-VL9CFXR81T',
};

// Guard against re-initialization during Next.js Fast Refresh
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

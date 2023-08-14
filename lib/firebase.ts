import { initializeApp, getApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBJLUmO4uLPNJ1FynPXXvPi8ICoRlaHDL4',
  authDomain: 'yumyumz.firebaseapp.com',
  projectId: 'yumyumz',
  storageBucket: 'yumyumz.appspot.com',
  messagingSenderId: '795084580931',
  appId: '1:795084580931:web:1a86d46573e3b4658c8cf6',
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const auth = getAuth();

export default app;
export { auth, db };

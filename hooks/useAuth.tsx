'use client';

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User,
  updateProfile,
  sendEmailVerification,
} from 'firebase/auth';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore';

import { useRouter } from 'next/navigation';
import { auth, db } from '../lib/firebase';
import { generateId } from '@/lib/utils';

interface IAuth {
  user: User | null;
  signUp: (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  error: string | null;
  loading: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<IAuth>({
  user: null,
  signUp: async () => {},
  signIn: async () => {},
  logout: async () => {},
  error: null,
  loading: false,
  isAuthenticated: false,
});

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState(null);
  const [initialLoading, setInitialLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      try {
        setInitialLoading(false);
        if (user) {
          // Logged in...
          setUser(user);
          setIsAuthenticated(true);
        } else {
          // Not logged in...
          setUser(null);
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error(error);
      } finally {
      }
    });
    return () => {
      unsubscribe();
    };
  }, [user]);

  const signUp = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = auth.currentUser;

      if (user) {
        await updateProfile(user, { displayName: firstName + ' ' + lastName });
        const timestamp = serverTimestamp();
        const userId = generateId();
        const userDoc = doc(db, 'users', userId);
        const userDetails = {
          firstName: firstName,
          lastName: lastName,
          email: email,
          timestamp: timestamp,
          lastLoginTimestamp: serverTimestamp(),
          uid: userId,
        };
        await setDoc(userDoc, userDetails);
        router.push('/');
        setUser(user);
        await sendEmailVerification(user);
        setLoading(false);
      } else {
        throw new Error('User is not signed in');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(userCredential.user);
      const userDocRef = doc(db, 'users', userCredential.user.uid);
      await updateDoc(userDocRef, {
        lastLoginTimestamp: serverTimestamp(),
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    router.push('/');
    try {
      await signOut(auth);
      setUser(null);
      window.location.reload();
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const memoedValue = useMemo(
    () => ({
      user,
      signUp,
      signIn,
      error,
      loading,
      logout,
      isAuthenticated,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user, loading, error, isAuthenticated]
  );

  return (
    <AuthContext.Provider value={memoedValue}>
      {!initialLoading && children}
    </AuthContext.Provider>
  );
};
export default function useAuth() {
  return useContext(AuthContext);
}

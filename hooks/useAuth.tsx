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
  signUp: (name: string, email: string, password: string) => Promise<void>;
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

  const signUp = async (name: string, email: string, password: string) => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = auth.currentUser;

      if (user) {
        await updateProfile(user, { displayName: name });
        const timestamp = serverTimestamp();
        const userId = generateId();
        const userDoc = doc(db, 'users', userId);
        const userDetails = {
          name: name,
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
      // Fetch the user's role from the "roles" collection
      const rolesRef = doc(db, 'roles', userCredential.user.uid);
      const roleSnapshot = await getDoc(rolesRef);
      const role = roleSnapshot.data()?.role; // Assuming the role field is stored as "role"
      // Update the lastLoginTimestamp field
      const userDocRef = doc(db, 'users', userCredential.user.uid);
      await updateDoc(userDocRef, {
        lastLoginTimestamp: serverTimestamp(),
      });

      // Customize the toast message based on the user's role
      let toastMessage = '';
      if (role === 'agent') {
        toastMessage =
          'Manage your listings and connect with potential clients.';
      } else if (role === 'user') {
        toastMessage =
          'Explore properties, save favorites, and connect with agents.';
      } else {
        // Handle other roles or a default message
        toastMessage = 'Welcome back! Start your real estate journey.';
      }
      // toast({
      //   title: 'Welcome back!',
      //   description: toastMessage,
      //   variant: 'destructive',
      // });

      // Reload the page
      window.location.reload();

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

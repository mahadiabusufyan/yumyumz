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
  deleteDoc,
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
    password: string,
    role: string,
    phoneNumber?: string,
    companyName?: string,
    companyLogo?: File,
    profileImage?: File,
    idImage?: File
  ) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  error: string | null;
  loading: boolean;
  isAuthenticated: boolean;
  isOnline: boolean;
  lastLogin: Date | null;
}

const AuthContext = createContext<IAuth>({
  user: null,
  signUp: async () => {},
  signIn: async () => {},
  logout: async () => {},
  error: null,
  loading: false,
  isAuthenticated: false,
  isOnline: false,
  lastLogin: null,
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
  const [isOnline, setIsOnline] = useState(true);
  const [lastLogin, setLastLogin] = useState<Date | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      try {
        setInitialLoading(false);
        if (user) {
          // Logged in...
          setUser(user);
          setIsAuthenticated(true);

          // Check if the user's session exists in the activeSessions collection
          const activeSessionRef = doc(db, 'activeSessions', user.uid);
          const activeSessionSnapshot = await getDoc(activeSessionRef);

          if (activeSessionSnapshot.exists()) {
            // User already has an active session, set online status to true
            setIsOnline(true);
          } else {
            // User does not have an active session, create a new session document
            await setDoc(activeSessionRef, { online: true });
            setIsOnline(true);
          }

          // Get the last login time from Firestore
          const userDocRef = doc(db, 'users', user.uid);
          const userDocSnapshot = await getDoc(userDocRef);
          if (userDocSnapshot.exists()) {
            const userData = userDocSnapshot.data();
            console.log(userData);
            const lastLoginTimestamp = userData?.lastLoginTimestamp;
            if (lastLoginTimestamp) {
              setLastLogin(lastLoginTimestamp.toDate());
            }
          }
        } else {
          // Not logged in...
          setUser(null);
          setIsAuthenticated(false);
          setIsOnline(false);
          setLastLogin(null);
        }
      } catch (error) {
        console.error(error);
      } finally {
      }
    });

    const handleBeforeUnload = async () => {
      // Update the online status to false when the user closes the tab or window
      if (user) {
        const activeSessionRef = doc(db, 'activeSessions', user.uid);
        await deleteDoc(activeSessionRef);
        const userDocRef = doc(db, 'users', user.uid);
        await setDoc(userDocRef, { online: false }, { merge: true });
      }
    };

    const handleVisibilityChange = async () => {
      // Update the online status based on document visibility changes
      if (user) {
        setIsOnline(!document.hidden);
        const activeSessionRef = doc(db, 'activeSessions', user.uid);
        if (document.hidden) {
          await deleteDoc(activeSessionRef);
        } else {
          await setDoc(activeSessionRef, { online: true });
        }
        const userDocRef = doc(db, 'users', user.uid);
        await setDoc(userDocRef, { online: !document.hidden }, { merge: true });
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      unsubscribe();
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [user]);

  const signUp = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    role: string
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
        const roleDoc = doc(db, 'roles', userId);
        const userRole = { role };
        await setDoc(roleDoc, userRole);
        role === 'user'
          ? router.push('/dashboard/profile')
          : router.push('/onboarding');
        setUser(user);
        await sendEmailVerification(user); // Send email verification link to the user

        let toastMessage = '';
        if (role === 'agent') {
          toastMessage = 'Complete your sign up process';
        } else if (role === 'user') {
          toastMessage =
            'Start your property search and discover endless possibilities.';
        } else {
          // Handle other roles or a default message
          toastMessage = 'Start your real estate journey.';
        }

        // toast({
        //   title: 'Welcome aboard!',
        //   description: toastMessage,
        //   variant: 'destructive',
        // });
        setLoading(false);
      } else {
        throw new Error('User is not signed in');
      }
    } catch (error) {
      // toast({
      //   title: 'Something went wrong.',
      //   description: 'Your sign up request failed. Please try again.',
      //   variant: 'destructive',
      // });
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
      // toast({
      //   title: 'Something went wrong.',
      //   description: 'Your sign-in request failed. Please try again.',
      //   variant: 'destructive',
      // });
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    router.push('/');
    try {
      // Update the online status to false before signing out
      if (user) {
        const userDocRef = doc(db, 'users', user.uid);
        await setDoc(userDocRef, { online: false }, { merge: true });
      }

      await signOut(auth);
      setUser(null);
      window.location.reload(); // Refresh the window
      // toast({
      //   title: 'See you soon!',
      //   description: 'Sign out successful. Come back soon!',
      //   variant: 'destructive',
      // });
    } catch (error) {
      // toast({
      //   title: 'Something went wrong',
      //   description: 'Sign out request failed. Please try again',
      //   variant: 'destructive',
      // });
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
      isOnline,
      lastLogin,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user, loading, error, isAuthenticated, isOnline, lastLogin]
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

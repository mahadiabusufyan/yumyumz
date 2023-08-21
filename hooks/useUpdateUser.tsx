import { useState } from 'react';
import { getAuth, updateEmail, updateProfile } from 'firebase/auth';
import {
  updateDoc,
  where,
  query,
  collection,
  getDocs,
  doc,
  serverTimestamp,
} from 'firebase/firestore';
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { db } from '../lib/firebase';
// import { toast } from '../components/Toaster/UseToast';

type UserFields = {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  email?: string;
  photoFile?: File | null;
  userId?: string;
};

function useUpdateUser() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error>(new Error(''));

  const updateUser = async (userData: UserFields) => {
    console.log(userData);
    try {
      setIsLoading(true);
      const auth = getAuth();
      const currentUser = auth.currentUser;

      if (!currentUser || currentUser.uid !== currentUser.uid) {
        throw new Error('Unauthorized');
      }

      const { firstName, lastName, ...restUserData } = userData;

      const updatedFields: Record<string, any> = {};

      if (firstName || lastName) {
        updatedFields.displayName = firstName + ' ' + lastName;
        updatedFields.firstName = firstName;
        updatedFields.lastName = lastName;
      }

      if (restUserData.phoneNumber) {
        updatedFields.phoneNumber = restUserData.phoneNumber;
      }

      if (restUserData.email && restUserData.email !== currentUser.email) {
        // Check if the new email already exists in the database
        const usersRef = collection(db, 'users');
        const queryRef = query(
          usersRef,
          where('email', '==', restUserData.email)
        );
        const userSnapshot = await getDocs(queryRef);
        const userDocs = userSnapshot.docs;

        if (userDocs.length > 0 && userDocs[0].data().uid !== currentUser.uid) {
          setIsLoading(false);
          throw new Error('The email is already taken');
        }

        updatedFields.email = restUserData.email;
        // Update email in authentication
        await updateEmail(currentUser, restUserData.email);
      }

      if (restUserData.photoFile) {
        // Check if the user has an existing photo
        if (currentUser.photoURL) {
          // Delete previous photo if exists
          const storageRef = ref(
            getStorage(),
            `users/${currentUser.uid}/profileImage`
          );
          await deleteObject(storageRef);
        }

        // Upload new photo file to storage and get the download URL
        const newStorageRef = ref(
          getStorage(),
          `users/${currentUser.uid}/profilePhoto`
        );
        const snapshot = await uploadBytesResumable(
          newStorageRef,
          restUserData.photoFile
        );
        const downloadURL = await getDownloadURL(snapshot.ref);

        updatedFields.photoURL = downloadURL;
      }

      console.log(updatedFields);
      console.log(userData.userId);
      // Update the user's profile with the updated fields
      await updateProfile(currentUser, updatedFields);

      delete updatedFields.photoFile;
      delete restUserData.photoFile;

      const usersRef = collection(db, 'users');
      const queryRef = query(
        usersRef,
        where('email', '==', auth.currentUser.email)
      );
      const userSnapshot = await getDocs(queryRef);
      const userDoc = userSnapshot.docs[0];
      if (userDoc) {
        await updateDoc(doc(usersRef, userData.userId), {
          ...restUserData,
          ...updatedFields,
          lastUpdateTimestamp: serverTimestamp(),
        });
      }

      console.log(userData.userId);

      setIsLoading(false);
      // toast({
      //   title: 'Updated successfully',
      //   description: 'Details updated successfully',
      //   variant: 'destructive',
      // });
    } catch (error) {
      setIsLoading(false);
      // toast({
      //   title: 'Something went wrong.',
      //   description: 'Your update request failed. Please try again.',
      //   variant: 'destructive',
      // });
      console.error(error);
    }
  };

  return { isLoading, error, updateUser };
}

export default useUpdateUser;

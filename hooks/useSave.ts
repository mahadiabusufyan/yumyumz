import { useState, useEffect } from 'react';
import 'firebase/firestore';

import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
// import { toast } from '@/components/Toaster/UseToast';

const useSave = (userId: string | undefined, recipeId: string) => {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const checkFavorite = async () => {
      if (userId) {
        const userDocRef = doc(db, 'users', userId);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const saved = userDoc.data()?.saved || [];
          setSaved(saved.includes(recipeId));
        }
      }
    };

    checkFavorite();
  }, [userId, recipeId]);

  const toggleSaved: () => Promise<void> = async () => {
    if (userId) {
      const userDocRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        const saved = userDoc.data()?.saved || [];
        if (saved) {
          const newSaved = saved.filter((id: string) => id !== recipeId);
          await updateDoc(userDocRef, { saved: newSaved });
          setSaved(false);
          // toast({
          //   title: 'Removed',
          //   description: 'Listing removed',
          //   variant: 'destructive',
          // });
        } else {
          // Add the saved
          const newSaved = [...saved, recipeId];
          await updateDoc(userDocRef, { saved: newSaved });
          setSaved(true);
          // toast({
          //   title: 'Added',
          //   description: 'Listing added',
          //   variant: 'destructive',
          // });
        }
      }
    } else {
      // Show a message or redirect the user to the sign-in page
    }
  };

  return [saved, toggleSaved];
};

export default useSave;

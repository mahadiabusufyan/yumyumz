import { useState, useEffect } from 'react';
import 'firebase/firestore';

import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
// import { toast } from '@/components/Toaster/UseToast';

const useSaved = (userId: string | undefined, recipeId: string) => {
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const checkFavorite = async () => {
      if (userId) {
        const userDocRef = doc(db, 'users', userId);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const saved = userDoc.data()?.saved || [];
          setIsSaved(saved.includes(recipeId));
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
        if (isSaved) {
          // Remove the favorite
          const newSaved = saved.filter((id: string) => id !== recipeId);
          await updateDoc(userDocRef, { saved: newSaved });
          setIsSaved(false);
          // toast({
          //   title: 'Removed',
          //   description: 'Recipe removed',
          //   variant: 'destructive',
          // });
        } else {
          // Add the favorite
          const newSaved = [...saved, recipeId];
          await updateDoc(userDocRef, { saved: newSaved });
          setIsSaved(true);
          // toast({
          //   title: 'Added',
          //   description: 'Recipe added',
          //   variant: 'destructive',
          // });
        }
      }
    } else {
      // Show a message or redirect the user to the sign-in page
    }
  };

  return [isSaved, toggleSaved];
};

export default useSaved;

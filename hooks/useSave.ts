// import { useState, useEffect } from 'react';
// import 'firebase/firestore';
// import { doc, getDoc, updateDoc } from 'firebase/firestore';
// import { db } from '../lib/firebase';
// // import { toast } from '@/components/Toaster/UseToast';

// const useSave = (userId: string | undefined, recipeId: string) => {
//   const [saved, setSaved] = useState(false);
//   console.log(recipeId);
//   useEffect(() => {
//     const checkSaved = async () => {
//       if (userId) {
//         const userDocRef = doc(db, 'users', userId);
//         const userDoc = await getDoc(userDocRef);
//         if (userDoc.exists()) {
//           const saved = userDoc.data()?.saved || [];
//           setSaved(saved.includes(recipeId));
//         }
//       }
//     };

//     checkSaved();
//   }, [userId, recipeId]);

//   const toggleSave: () => Promise<void> = async () => {
//     if (userId) {
//       const userDocRef = doc(db, 'users', userId);
//       const userDoc = await getDoc(userDocRef);
//       if (userDoc.exists()) {
//         const saved = userDoc.data()?.saved || [];
//         if (saved) {
//           // Remove the saved
//           const newSaved = saved.filter((id: string) => id !== recipeId);
//           await updateDoc(userDocRef, { saved: newSaved });
//           setSaved(false);
//         } else {
//           // Add the saved
//           const newSaved = [...saved, recipeId];
//           await updateDoc(userDocRef, { saved: newSaved });
//           setSaved(true);
//         }
//       }
//     } else {
//     }
//   };
//   console.log(saved);
//   return [saved, toggleSave];
// };

// export default useSave;
import { useState, useEffect } from 'react';
import 'firebase/firestore';

import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
// import { toast } from '@/components/Toaster/UseToast';

const useSave = (userId: string | undefined, listingId: string) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const checkFavorite = async () => {
      if (userId) {
        const userDocRef = doc(db, 'users', userId);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const favorites = userDoc.data()?.favorites || [];
          setIsFavorite(favorites.includes(listingId));
        }
      }
    };

    checkFavorite();
  }, [userId, listingId]);

  const toggleFavorite: () => Promise<void> = async () => {
    if (userId) {
      const userDocRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        const favorites = userDoc.data()?.favorites || [];
        if (isFavorite) {
          // Remove the favorite
          const newFavorites = favorites.filter(
            (id: string) => id !== listingId
          );
          await updateDoc(userDocRef, { favorites: newFavorites });
          setIsFavorite(false);
          // toast({
          //   title: 'Removed',
          //   description: 'Listing removed',
          //   variant: 'destructive',
          // });
        } else {
          // Add the favorite
          const newFavorites = [...favorites, listingId];
          await updateDoc(userDocRef, { favorites: newFavorites });
          setIsFavorite(true);
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

  return [isFavorite, toggleFavorite];
};

export default useSave;

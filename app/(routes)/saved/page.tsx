'use client';

import Button from '@/components/Common/Button';
import Footer from '@/components/Layout/Footer';
import Header from '@/components/Layout/Header';
import useAuth from '@/hooks/useAuth';
import { Recipe } from '@/types';
import Lottie from 'lottie-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import ingredients from '../../../public/assets/ingredients.json';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import RecipeCard from '@/components/Common/RecipeCard';
import Heading from '@/components/Common/Heading';

type Props = {};

const SavedRecipesPage = (props: Props) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState<boolean>(true);
  const [animationHeight, setAnimationHeight] = useState(400);

  const [saved, setSaved] = useState<Recipe[]>([]);
  console.log(saved);
  useEffect(() => {
    async function fetchSaved() {
      try {
        const userQuery = query(
          collection(db, 'users'),
          where('uid', '==', user?.uid)
        );
        const userDocs = await getDocs(userQuery);
        if (userDocs.empty) {
          return;
        }
        const userDoc = userDocs.docs[0];

        const savedIds = userDoc.data()?.saved || [];
        const savedPromises = savedIds.map((id: string) => {
          const listingRef = doc(db, 'recipes', id);
          return getDoc(listingRef);
        });
        const savedDocs = await Promise.all(savedPromises);
        const savedRecipes: any = savedDocs
          .map((doc) => {
            if (!doc.exists()) {
              return null;
            }
            return {
              id: doc.id,
              data: doc.data(),
            };
          })
          .filter((listing) => listing !== null);
        setSaved(savedRecipes);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    fetchSaved();
  }, [saved, user?.uid]);

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      console.log(screenWidth);
      if (screenWidth <= 375) {
        setAnimationHeight(90);
      } else if (screenWidth <= 414) {
        setAnimationHeight(150);
      } else if (screenWidth <= 1024) {
        setAnimationHeight(170);
      } else {
        setAnimationHeight(280);
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <main>
      <Header />

      {saved.length > 0 ? (
        <div className="bg-white rounded-md container px-3 lg:px-0 ">
          <Heading
            title={'My saved Recipes'}
            subtitle="Recipes that have been saved"
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 mt-5">
            {saved.map((recipe) => {
              return <RecipeCard key={recipe.id} recipe={recipe} />;
            })}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-md container px-3 lg:px-0 flex flex-col items-center justify-center h-[70vh]">
          <Lottie
            style={{ height: animationHeight }}
            animationData={ingredients}
            loop={true}
          />
          <div className="mt-10 w-full flex items-center justify-center">
            <Button onClick={() => router.push('/')} label={'Browse recipes'} />
          </div>
        </div>
      )}
      <Footer />
    </main>
  );
};

export default SavedRecipesPage;

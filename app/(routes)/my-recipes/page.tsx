'use client';
import BigLoader from '@/components/Common/BigLoader';
import Footer from '@/components/Layout/Footer';
import Header from '@/components/Layout/Header';
import useAuth from '@/hooks/useAuth';
import { auth, db } from '@/lib/firebase';
import { Recipe } from '@/types';
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import Lottie from 'lottie-react';
import foodshow from '../../../public/assets/foodshow.json';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Button from '@/components/Common/Button';
import { AiOutlinePlus } from 'react-icons/ai';
import useAddRecipeModal from '@/hooks/useAddRecipeModal';
import RecipeCard from '@/components/Common/RecipeCard';

type Props = {};

const MyRecipesPage = (props: Props) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const router = useRouter();
  const addRecipeModal = useAddRecipeModal();
  const { user, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState<boolean>(true);
  const [animationHeight, setAnimationHeight] = useState(400);

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

  useEffect(() => {
    async function fetchUserRecipes() {
      const recipesRef = collection(db, 'recipes');
      const q = query(
        recipesRef,
        where('ownerRef', '==', auth.currentUser?.uid || ''),
        orderBy('timestamp', 'desc')
      );
      const querySnap = await getDocs(q);
      let recipes: Recipe[] = [];
      querySnap.forEach((doc) => {
        recipes.push({
          id: doc.id,
          data: doc.data() as Recipe['data'],
        });
      });
      setRecipes(recipes);
      setLoading(false);
    }
    fetchUserRecipes();
  }, []);

  const onDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'recipes', id));
      const updatedRecipes = recipes.filter((recipe) => recipe.id !== id);
      setRecipes(updatedRecipes);
      // toast.success('Successfully deleted the recipe');
    } catch (error) {
      console.error('Error deleting recipe:', error);
      // toast.error('Failed to delete the recipe');
    }
  };
  return (
    <main>
      <Header />
      {recipes.length > 0 ? (
        <div className="bg-white rounded-md container px-3 lg:px-0">
          <div>
            {recipes.map((recipe) => {
              return <RecipeCard key={recipe.id} recipe={recipe} />;
            })}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-md container px-3 lg:px-0 flex flex-col items-center justify-center h-[70vh]">
          <Lottie
            style={{ height: animationHeight }}
            animationData={foodshow}
            loop={true}
          />
          <div className="mt-10 w-full flex items-center justify-center">
            <Button
              icon={AiOutlinePlus}
              onClick={addRecipeModal.onOpen}
              label={'Post new recipe'}
            />
          </div>
        </div>
      )}
      <Footer />
    </main>
  );
};

export default MyRecipesPage;

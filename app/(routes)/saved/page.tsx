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

type Props = {};

const SavedRecipesPage = (props: Props) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const router = useRouter();
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
  return (
    <main>
      <Header />
      {1 < 0 ? (
        <div className="bg-white rounded-md container px-3 lg:px-0">
          <div>
            {/* {recipes.map((recipe) => {
            return <RecipeCard key={recipe.id} recipe={recipe} />;
          })} */}
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

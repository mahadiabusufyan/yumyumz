'use client';

import Button from '@/components/Common/Button';
import useAuth from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Lottie from 'lottie-react';
import recipe from '../../../public/assets/recipe.json';
import { AiOutlinePlus } from 'react-icons/ai';
import useAddRecipeModal from '@/hooks/useAddRecipeModal';

const Hero = () => {
  const { user } = useAuth();
  const router = useRouter();
  const addRecipeModal = useAddRecipeModal();
  const [animationHeight, setAnimationHeight] = useState(400);

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      console.log(screenWidth);
      if (screenWidth <= 375) {
        setAnimationHeight(90);
      } else if (screenWidth <= 414) {
        setAnimationHeight(100);
      } else if (screenWidth <= 1024) {
        setAnimationHeight(140);
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
    <div className="h-auto px-3">
      <div className="bg-primary h-full container mx-auto rounded-2xl flex flex-col lg:flex-row items-center justify-center p-5 py-10">
        <div className="lg:w-1/2 text-center lg:text-left flex flex-col items-center justify-center lg:items-start gap-3 lg:pl-14">
          <h3 className="text-3xl sm:text-5xl lg:text-6xl font-semibold">
            The Recipe Community
          </h3>
          <p className="text-base md:text-lg">
            Cooking with ❤️{'  '} Sharing with the World
          </p>
          <div className="mt-3 w-full flex items-center justify-center lg:justify-start">
            <Button
              icon={user ? AiOutlinePlus : null}
              onClick={
                user
                  ? addRecipeModal.onOpen
                  : () => router.push('/auth/register')
              }
              label={user ? 'Add new recipe' : "Get started - It's free"}
            />
          </div>
        </div>
        <div className="lg:items-center lg:justify-center flex mt-2 lg:mt-0">
          <div className="mx-auto">
            <Lottie
              style={{ height: animationHeight }}
              animationData={recipe}
              loop={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

'use client';

import Button from '@/components/Common/Button';
import useAuth from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Lottie from 'lottie-react';
import recipe from '../../../public/assets/recipe.json';
import { AiOutlinePlus } from 'react-icons/ai';

const Hero = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [animationHeight, setAnimationHeight] = useState(400);

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth <= 768) {
        setAnimationHeight(170); // Small screens
      } else if (screenWidth <= 1024) {
        setAnimationHeight(250); // Tablet screens
      } else {
        setAnimationHeight(400); // Larger screens
      }
    };

    // Initial calculation on mount
    handleResize();

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="w-full h-[60vh] md:h-[70vh] flex items-center justify-center px-3">
      <div className="bg-[#f3def9] h-full container mx-auto rounded-3xl flex flex-col lg:flex-row items-center justify-center p-5">
        <div className="lg:w-1/2 text-center lg:text-left flex flex-col items-center justify-center lg:items-start gap-3 lg:pl-16">
          <h3 className="text-5xl lg:text-6xl font-semibold">
            The Recipe Community
          </h3>
          <p className="text-base lg:text-lg">
            Cooking with Love ❤️, Sharing with the World.
          </p>
          <div className="mt-3 w-full flex items-center justify-center lg:justify-start">
            <Button
              icon={user ? AiOutlinePlus : null} // Conditional icon rendering
              onClick={() => router.push('/auth/register')}
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

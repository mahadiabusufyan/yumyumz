'use client';

import Button from '@/components/Common/Button';
import useAuth from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Lottie from 'lottie-react';
import recipe from '../../../public/assets/recipe.json';

const Hero = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [animationHeight, setAnimationHeight] = useState(400);

  useEffect(() => {
    const screenWidth = window.innerWidth;
    if (screenWidth <= 768) {
      setAnimationHeight(300);
    } else {
      setAnimationHeight(400);
    }
  }, []);
  return (
    <div className="w-full h-[70vh] lg:h-[60vh] flex items-center justify-center px-3">
      <div className="bg-[#f3def9] h-full container rounded-3xl  relative px-3 flex flex-col items-center justify-center lg:flex-row w-full">
        <div className="lg:w-1/2 text-center w-full lg:text-left flex flex-col items-center justify-center lg:pl-10 lg:items-start gap-5 h-full">
          <h3 className="text-5xl lg:text-6xl font-medium">
            The Recipe <br></br>Community
          </h3>
          <p className="text-xl">
            Cooking with Love ❤️, Sharing with the World.
          </p>
          {user ? (
            <div></div>
          ) : (
            <div className="grid gap-3">
              <Button
                onClick={() => router.push('/auth/register')}
                label="Get started - It's free"
              />
            </div>
          )}
        </div>
        <div className="items-center justify-center flex">
          <div className="mx-auto -mt-5">
            <Lottie
              style={{ height: animationHeight }}
              animationData={recipe}
              loop={0}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

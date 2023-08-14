'use client';

import Button from '@/components/Common/Button';
import useAuth from '@/hooks/useAuth';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import Lottie from 'lottie-react';
import recipe from '../../../public/assets/recipe.json';

type Props = {};

const style = {
  height: 400,
};

const Hero = (props: Props) => {
  const { user } = useAuth();
  const router = useRouter();
  const [playOnce, setPlayOnce] = useState(true); // State to control playing the animation once
  const handleAnimationFinish = () => {
    setPlayOnce(false); // Set the state to stop the animation after it completes one loop
  };
  return (
    <div className="w-full h-[45vh] lg:h-[60vh] flex items-center justify-center px-3">
      <div className="bg-[#f3def9] h-full container rounded-3xl  relative px-3 flex flex-col lg:flex-row w-full">
        <div className="lg:w-1/2 text-center w-full lg:text-left flex flex-col items-center justify-center lg:pl-10 lg:items-start gap-5 h-full">
          <h3 className="text-4xl lg:text-6xl font-medium">
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
        <div className="items-center justify-center hidden lg:flex">
          <div className="mx-auto -mt-5">
            <Lottie style={style} animationData={recipe} loop={0} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

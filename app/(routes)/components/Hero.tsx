'use client';

import Button from '@/components/Common/Button';
import useAuth from '@/hooks/useAuth';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

type Props = {};

const Hero = (props: Props) => {
  const { user } = useAuth();
  const router = useRouter();
  return (
    <div className="w-full h-[45vh] lg:h-[60vh] flex items-center justify-center px-3">
      <div className="bg-[#fbe1dd]/50 h-full container rounded-xl  relative px-3 flex flex-col lg:flex-row w-full">
        <div className="lg:w-1/2 text-center w-full lg:text-left flex flex-col items-center justify-center lg:pl-10 lg:items-start gap-5 h-full">
          <h3 className="text-5xl lg:text-6xl font-medium">
            Share your most impressive recipes
          </h3>
          <p className="text-xl">
            Cooking with Love ❤️, Sharing with the World.
          </p>
          {user ? (
            <div></div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              <Button
                onClick={() => router.push('/auth/login')}
                outline
                small
                label={'Login'}
              />
              <Button
                small
                onClick={() => router.push('/auth/register')}
                label={'Sign up'}
              />
            </div>
          )}
        </div>
        <div className="hidden lg:inline">
          <Image
            height={200}
            width={200}
            src={'/assets/img/cooking.png'}
            alt={''}
            className="object-cover lg:h-full lg:w-full h-[300px] w-[300px]"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;

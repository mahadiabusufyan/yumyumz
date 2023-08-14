'use client';

import useAuth from '@/hooks/useAuth';
import React from 'react';
import Button from '../Common/Button';
import Logo from '../Common/Logo';
import { useRouter } from 'next/navigation';
import UserMenu from '../Common/UserMenu';
import { RiHeart3Line } from 'react-icons/ri';

type Props = {};

const Header = (props: Props) => {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  return (
    <header className="z-50 sticky top-0 w-full py-5 duration-300 md:transition-none bg-white">
      <div className="flex items-center justify-center w-full">
        <div className="container flex items-center justify-between w-ful px-3 md:px-0">
          <Logo />
          <div className="flex items-center justify-center">
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => router.push('/saved')}
                  className="p-2.5 rounded"
                >
                  <RiHeart3Line
                    size={30}
                    className={
                      'text-gray-500 hover:text-[#DE79FB] transition duration-300'
                    }
                  />
                </button>
                <UserMenu />
              </div>
            ) : (
              <div className="grid grid-cols-2">
                <Button
                  onClick={() => router.push('/auth/login')}
                  outline
                  label={'Login'}
                />
                <Button
                  onClick={() => router.push('/auth/register')}
                  label={'Sign up'}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

'use client';

import useAuth from '@/hooks/useAuth';
import React from 'react';
import Button from '../Common/Button';
import Logo from '../Common/Logo';
import { useRouter } from 'next/navigation';
import UserMenu from '../Common/UserMenu';
import { RiHeart3Line } from 'react-icons/ri';
import useAddRecipeModal from '@/hooks/useAddRecipeModal';
import { AiOutlinePlus } from 'react-icons/ai';
import Tooltip from '../Common/Tooltip';

type Props = {};

const Header = (props: Props) => {
  const { isAuthenticated } = useAuth();
  const addRecipeModal = useAddRecipeModal();

  const router = useRouter();
  return (
    <header className="z-50 sticky top-0 w-full py-5 duration-300 md:transition-none bg-white">
      <div className="flex items-center justify-center w-full">
        <div className="container flex items-center justify-between w-ful px-3 md:px-0">
          <Logo />
          <div className="flex items-center justify-center">
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <button
                  data-tooltip-id="add-recipe"
                  onClick={addRecipeModal.onOpen}
                  className="p-2.5 group hover:bg-gray-100 rounded-full transition duration-300"
                >
                  <AiOutlinePlus
                    size={25}
                    className={
                      'text-gray-500 group-hover:text-[#DE79FB] transition duration-300'
                    }
                  />
                </button>
                <Tooltip id="add-recipe" content="Add new recipe" />
                <button
                  data-tooltip-id="saved-recipes"
                  onClick={() => router.push('/saved')}
                  className="p-2.5 group hover:bg-gray-100 rounded-full transition duration-300"
                >
                  <RiHeart3Line
                    size={25}
                    className={
                      'text-gray-500 group-hover:text-[#DE79FB] transition duration-300'
                    }
                  />
                </button>
                <Tooltip id="saved-recipes" content="Saved recipes" />
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

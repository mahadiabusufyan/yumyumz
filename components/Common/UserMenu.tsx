'use client';

import React, { useState, useRef } from 'react';
import UserPicture from './UserPicture';
import useAuth from '@/hooks/useAuth';
import { TbDoorExit } from 'react-icons/tb';
import { VscBook } from 'react-icons/vsc';
import { RiSettings4Line } from 'react-icons/ri';
import { RxCaretDown } from 'react-icons/rx';

const UserMenu = () => {
  const { user, logout } = useAuth();
  const [isHovered, setIsHovered] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative inline-block text-sm">
      <button
        type="button"
        className="flex items-center justify-center transition-all duration-300"
        id="menu-button"
        aria-expanded="true"
        aria-haspopup="true"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        ref={toggleRef}
      >
        <span>
          {' '}
          <UserPicture
            src={user?.photoURL}
            className="w-12 h-12 rounded group-hover:border-2 border"
          />
        </span>
        <RxCaretDown size={30} className="" />
      </button>
      <div
        className={`absolute right-0 z-[2000] w-[175px] whitespace-nowrap drop-shadow-xl mt-1 transition-dropdown motion-reduce:transition-none ease-out duration-300 ${
          isHovered
            ? 'opacity-100 translate-y-0 visible'
            : 'opacity-0 -translate-y-2 invisible'
        } divide-y divide-gray-200  bg-white  border border-gray-300  rounded-lg`}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="menu-button"
        ref={menuRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="py-0.5 px-1 w-full" role="none">
          <button
            onClick={logout}
            className="group flex items-center rounded-md space-x-4 px-3 py-2 hover:bg-gray-50 transition-all duration-300 w-full text-lg"
            role="menuitem"
          >
            <VscBook
              size={23}
              className="group-hover:text-[#DE79FB] transition-all duration-300"
            />
            <span className="group-hover:text-[#DE79FB] transition-all duration-300">
              Recipes
            </span>
          </button>
        </div>
        <div className="py-0.5 px-1 w-full" role="none">
          <button
            onClick={logout}
            className="group flex items-center rounded-md space-x-4 px-3 py-2 hover:bg-gray-50 transition-all duration-300 w-full text-lg"
            role="menuitem"
          >
            <RiSettings4Line
              size={23}
              className="group-hover:text-[#DE79FB] transition-all duration-300"
            />
            <span className="group-hover:text-[#DE79FB] transition-all duration-300">
              Settings
            </span>
          </button>
        </div>
        <div className="py-0.5 px-1 w-full" role="none">
          <button
            onClick={logout}
            className="group flex items-center rounded-md space-x-4 px-3 py-2 hover:bg-gray-50 transition-all duration-300 w-full text-lg"
            role="menuitem"
          >
            <TbDoorExit
              size={23}
              className="group-hover:text-red-600 transition-all duration-300"
            />
            <span className="group-hover:text-red-600 transition-all duration-300">
              Logout
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserMenu;

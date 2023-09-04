import React, { FC } from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { IoFastFoodOutline, IoFastFoodSharp } from 'react-icons/io5';

interface LogoProps {
  className?: string;
}

const Logo: FC<LogoProps> = ({ className }) => {
  return (
    <Link href={'/'}>
      <div
        className={clsx(
          'text-2xl font-bold cursor-pointer transition-all duration-300 group flex items-center',
          className
        )}
      >
        <div className="mr-1">
          {' '}
          <IoFastFoodOutline
            size={30}
            className=" transition duration-300 hover:text-secondary md:hover:text-black"
          />
        </div>

        <span className="text-secondary group-hover:text-black transition-all duration-300 hidden md:inline-flex">
          yum
        </span>
        <span className="text-black group-hover:text-secondary transition-all duration-300 hidden md:inline-flex">
          yumz
        </span>
      </div>
    </Link>
  );
};

export default Logo;

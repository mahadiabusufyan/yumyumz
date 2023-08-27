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
          'text-xl md:text-2xl font-bold cursor-pointer transition-all duration-300 group flex items-center',
          className
        )}
      >
        <div className="mr-2">
          {' '}
          <IoFastFoodOutline
            size={30}
            className="group-hover:hidden transition duration-300"
          />
          <IoFastFoodSharp
            size={30}
            className="group-hover:inline-flex hidden text-secondary"
          />
        </div>
        <span className="text-secondary group-hover:text-black transition-all duration-300">
          yum
        </span>
        <span className="text-black group-hover:text-secondary transition-all duration-300">
          yumz
        </span>
      </div>
    </Link>
  );
};

export default Logo;

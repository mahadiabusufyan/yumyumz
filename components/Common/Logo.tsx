import React, { FC } from 'react';
import clsx from 'clsx';
import Link from 'next/link';

interface LogoProps {
  className?: string;
}

const Logo: FC<LogoProps> = ({ className }) => {
  return (
    <Link href={'/'}>
      <div
        className={clsx(
          'text-2xl md:text-3xl font-bold cursor-pointer transition-all duration-300 group flex items-center',
          className
        )}
      >
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

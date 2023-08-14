import React, { FC } from 'react';
import clsx from 'clsx';
import Link from 'next/link';

interface LogoProps {
  className?: string;
}

const Logo: FC<LogoProps> = ({ className }) => {
  const defaultColors = {
    base: 'text-blue-500',
    hover: 'hover:text-red-500',
  };

  return (
    <Link href={'/'}>
      <div
        className={clsx(
          'text-2xl font-bold cursor-pointer transition-all duration-300 group',
          className
        )}
      >
        <span className="text-[#ffcbc3] group-hover:text-black transition-all duration-300">
          yum
        </span>
        <span className="text-black group-hover:text-[#ffcbc3] transition-all duration-300">
          yumz
        </span>
        <span className="text-black text-5xl">.</span>
      </div>
    </Link>
  );
};

export default Logo;

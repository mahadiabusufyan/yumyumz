import React from 'react';
import { IconType } from 'react-icons';
import SmallSpinner from './SmallSpinner';

type Props = {
  label: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  loading?: boolean;
  outline?: boolean;
  full?: boolean;
  small?: boolean;
  icon?: IconType;
  isColor?: boolean;
};

function Button({
  label,
  onClick,
  disabled,
  loading,
  outline,
  full,
  small,
  icon: Icon,
  isColor,
}: Props) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`relative disabled:opacity-80 disabled:cursor-not-allowed rounded-full hover:opacity-80 transition px-5 ${
        full ? 'w-full' : ''
      } ${outline ? 'bg-white' : 'bg-black'} ${outline ? '' : 'border-black'} ${
        outline ? 'text-black' : 'text-white'
      } ${small ? 'text-xs lg:text-sm' : 'text-sm lg:text-base'} 
      ${small ? 'py-2.5' : 'py-3'}
       ${small ? '' : ''}`}
    >
      {Icon && (
        <Icon
          size={24}
          className={`absolute left-4 top-3 ${isColor && 'text-blue-600'}`}
        />
      )}
      {loading ? <SmallSpinner /> : label}
    </button>
  );
}

export default Button;

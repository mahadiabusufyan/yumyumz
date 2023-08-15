import React from 'react';
import { IconType } from 'react-icons';
import SmallLoader from './SmallLoader';

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
      className={`relative disabled:opacity-80 disabled:cursor-not-allowed font-medium rounded-full hover:opacity-80 transition px-5 ${
        full ? 'w-full' : ''
      } ${outline ? 'bg-white' : 'bg-black'} ${outline ? '' : 'border-black'} ${
        outline ? 'text-black' : 'text-white'
      } ${small ? 'text-sm' : 'text-base'} 
      ${small ? 'py-2' : 'py-3.5'}
       ${small ? '' : ''}`}
    >
      {Icon && (
        <Icon
          size={24}
          className={`absolute left-4 top-3 ${isColor && 'text-blue-600'}`}
        />
      )}
      {loading ? <SmallLoader /> : label}
    </button>
  );
}

export default Button;

import React from 'react';
import { IconType } from 'react-icons';
import SmallSpinner from './SmallSpinner';

type Props = {
  label: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  loading?: boolean;
  outline?: boolean;
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
  small,
  icon: Icon,
  isColor,
}: Props) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`relative disabled:opacity-80 disabled:cursor-not-allowed rounded-full hover:opacity-80 transition w-full px-5 ${
        outline ? 'bg-white' : 'bg-black'
      } ${outline ? 'border-[#013737]' : 'border-black'} ${
        outline ? 'text-black' : 'text-white'
      } ${small ? 'text-sm' : 'text-base'} ${small ? 'py-3' : 'py-3'} ${
        small ? '' : ''
      } ${small ? 'border-[1px]' : 'border'}`}
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

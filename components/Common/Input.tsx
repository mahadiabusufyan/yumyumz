'use client';

import { ReactNode } from 'react';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import { IconType } from 'react-icons';
import { BiDollar } from 'react-icons/bi';

interface InputProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  icon?: IconType;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  children?: ReactNode;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  type = 'text',
  disabled,
  icon: Icon,
  register,
  required,
  errors,
  children,
}) => {
  return (
    <div className="w-full relative">
      {Icon && (
        <Icon
          size={24}
          className="
            text-neutral-700
            absolute
            top-5
            left-2
          "
        />
      )}
      <input
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        placeholder=" "
        type={type}
        className={`
          peer
          w-full
          p-4
          pt-6 
          font-light 
          bg-white 
          border-2
          z-10
          rounded-xl
          outline-none
          transition
          disabled:opacity-70
          disabled:cursor-not-allowed
          ${Icon ? 'pl-9' : 'pl-4'}
          ${errors[id] ? 'border-rose-500' : 'border-neutral-400'}
          ${errors[id] ? 'focus:border-rose-500' : 'focus:border-[#de79fb]'}
        `}
      />
      <label
        className={`
          absolute 
          text-md
          duration-150 
          transform 
          -translate-y-3 
          top-5 
          z-0
          cursor-text
          origin-[0] 
          ${Icon ? 'left-9' : 'left-4'}
          peer-placeholder-shown:scale-100 
          peer-placeholder-shown:translate-y-0 
          peer-focus:scale-75
          peer-focus:-translate-y-4
          ${errors[id] ? 'text-rose-500' : 'text-zinc-400'}
        `}
      >
        {label}
      </label>
      {children}
    </div>
  );
};

export default Input;

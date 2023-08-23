import { ChangeEventHandler, FocusEventHandler, ReactNode } from 'react';
import { IconType } from 'react-icons';

interface InputProps {
  icon?: IconType;
  id: string;
  type?: string;
  name: string;
  placeholder?: string;
  disabled?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement> | undefined;
  label?: string;
  error?: boolean | string | undefined;
  errorText?: boolean | string | undefined;
  onBlur?: FocusEventHandler<HTMLInputElement> | undefined;
  children?: ReactNode;
  value: string | number;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  type = 'text',
  disabled,
  icon: Icon,
  errorText,
  error,
  onChange,
  onBlur,
  children,
  value,
}) => {
  return (
    <div className="w-full relative">
      {Icon && (
        <Icon
          size={24}
          className="text-neutral-700 absolute top-5 left-2
          "
        />
      )}
      <input
        id={id}
        disabled={disabled}
        onBlur={onBlur}
        type={type}
        autoComplete="off"
        min={0}
        spellCheck="false"
        value={value}
        onChange={onChange}
        placeholder=" "
        className={` peer w-full p-3  pt-6 bg-white border-2 z-10 rounded-xl outline-none transition hover:border-secondary disabled:opacity-70 disabled:cursor-not-allowed ${
          Icon ? 'pl-9' : 'pl-4'
        }  ${error ? 'border-rose-500' : 'border-black'} ${
          error ? 'focus:border-rose-500' : 'focus:border-secondary'
        }
        `}
      />
      <label
        htmlFor={id}
        className={`absolute text-md duration-150 transform -translate-y-3 top-5 z-0 cursor-text origin-[0] ${
          Icon ? 'left-9' : 'left-4'
        } peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 ${
          error ? 'text-rose-500' : 'text-gray-600'
        } ${error ? 'peer-focus:text-rose-500' : 'peer-focus:text-secondary'}
        `}
      >
        {label}
      </label>
      {children}
    </div>
  );
};

export default Input;

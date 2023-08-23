import React, { useState } from 'react';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

interface Option {
  label: string;
  value: string;
}

const Filter = ({ title, options, onChange }: any) => {
  const [expanded, setExpanded] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const toggleOptions = () => {
    setExpanded(!expanded);
  };

  const handleOptionChange = (value: string) => {
    const updatedOptions = selectedOptions.includes(value)
      ? selectedOptions.filter((option) => option !== value)
      : [...selectedOptions, value];

    setSelectedOptions(updatedOptions);
    onChange(updatedOptions);
  };

  return (
    <div className={`border-b ${expanded ? 'pb-4' : 'pb-0'}`}>
      <div
        className={`flex items-center justify-between cursor-pointer py-3 border-b transition-all duration-300 ${
          expanded ? 'text-secondary' : 'text-black'
        }`}
        onClick={toggleOptions}
      >
        <h2 className="text-lg font-medium">{title}</h2>
        {expanded ? (
          <AiOutlineMinus
            size={25}
            className={`transition-transform transform ${
              expanded ? '' : 'rotate-0'
            }`}
          />
        ) : (
          <AiOutlinePlus
            size={25}
            className="transition-transform transform rotate-0"
          />
        )}
      </div>
      <div
        className={`mt-2 flex flex-col gap-2 transition-all duration-300 max-h-40 overflow-y-auto !scrollbar-thin !scrollbar-track-transparent !scrollbar-thumb-secondary ${
          expanded ? 'opacity-100 block' : 'opacity-0 hidden'
        }`}
      >
        {options.map((option: { value: string; label: string }) => (
          <label
            key={option.value}
            className={`flex items-center justify-between pr-1 hover:text-secondary ${
              expanded ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <span className="text-lg">{option.label}</span>
            <input
              type="checkbox"
              checked={selectedOptions.includes(option.value)}
              onChange={() => handleOptionChange(option.value)}
              className="w-5 h-5 text-white bg-black border-gray-300 rounded focus:ring-secondary cursor-pointer pr-3"
            />
          </label>
        ))}
      </div>
    </div>
  );
};

export default Filter;

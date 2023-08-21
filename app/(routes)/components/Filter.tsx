import React, { useState } from 'react';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { RiAddCircleFill, RiSubtractLine } from 'react-icons/ri';

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
    <div className="border-b">
      <div
        className="flex items-center justify-between cursor-pointer py-3 border-b"
        onClick={toggleOptions}
      >
        <h2 className="text-lg font-semibold">{title}</h2>
        {expanded ? <AiOutlineMinus size={25} /> : <AiOutlinePlus size={25} />}
      </div>
      {expanded && (
        <div className="mt-2 flex flex-col gap-2">
          {options.map((option: { value: string; label: string }) => (
            <label
              key={option.value}
              className="flex items-center justify-between pr-1"
            >
              <span className="text-lg">{option.label}</span>

              <input
                type="checkbox"
                checked={selectedOptions.includes(option.value)}
                onChange={() => handleOptionChange(option.value)}
                className="w-5 h-5 text-white bg-black border-gray-300 rounded focus:ring-secondary cursor-pointer"
              />
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default Filter;

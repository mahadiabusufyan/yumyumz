import React from 'react';
import { BiFilter } from 'react-icons/bi';

interface SortDropdownProps {
  handleSortChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SortDropdown: React.FC<SortDropdownProps> = ({ handleSortChange }) => {
  return (
    <div className="hidden lg:flex items-center bg-black py-3 px-5 text-white rounded-full text-sm justify-center lg:justify-start">
      <select
        className="rounded-md focus:ring-0 focus:outline-0 w-fit bg-transparent"
        onChange={handleSortChange}
      >
        <option value=".asc">Recommended</option>
        <option value="cookingTime.asc">Duration (low to high)</option>
        <option value="cookingTime.desc">Duration (high to low)</option>
        <option value="timestamp.desc">Newest</option>
        <option value="timestamp.asc">Oldest</option>
      </select>
    </div>
  );
};

export default SortDropdown;

import React from 'react';
import { Filters } from './BrowseRecipes';
import Filter from './Filter';
import { DifficultyOptions } from '@/lib/options';
import { cuisines } from '@/lib/cuisines';

type FilterControlsProps = {
  handleFilterChange: (key: keyof Filters, value: string) => void;
  filterOptions: Filters;
  handleResetFilters: () => void;
  searchResults: number;
};

const FilterControls = ({
  handleFilterChange,
  filterOptions,
  handleResetFilters,
}: FilterControlsProps) => {
  return (
    <div className="flex flex-col space-y-4">
      <Filter
        title="Category"
        options={cuisines}
        onChange={(value: string) => handleFilterChange('cuisine', value)}
      />
      <Filter
        title="Difficulty"
        options={DifficultyOptions}
        onChange={(value: string) => handleFilterChange('difficulty', value)}
      />
    </div>
  );
};

export default FilterControls;

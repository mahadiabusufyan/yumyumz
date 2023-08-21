import React from 'react';
import { Filters } from './BrowseRecipes';
import Filter from './Filter';
import { ProjectsOptions } from '@/lib/options';
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
    <div className="">
      <Filter
        title="Category"
        options={cuisines}
        onChange={(value: string) => handleFilterChange('cuisine', value)}
      />
    </div>
  );
};

export default FilterControls;

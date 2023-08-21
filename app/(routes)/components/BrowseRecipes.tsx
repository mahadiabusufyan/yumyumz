'use client';

import Heading from '@/components/Common/Heading';
import useRecipes from '@/hooks/useRecipes';
import React, { useState } from 'react';
import { BiFilter, BiSearch } from 'react-icons/bi';
import RecipeResults from './RecipeResults';
import LargeLoader from '@/components/Common/LargeLoader';
import FilterControls from './FilterControls';
import BigLoader from '@/components/Common/BigLoader';

type Props = {};

export type Filters = {
  title?: string;
  cuisine?: [];
  difficulty?: string;
  cookingTime?: {
    min: number;
    max: number;
  };
  search?: string;
};

type SortOrder = 'asc' | 'desc';

const BrowseRecipes = (props: Props) => {
  const [filterOptions, setFilterOptions] = useState<Filters>({
    title: '',
    cuisine: [],
    difficulty: '',
    cookingTime: {
      min: 0,
      max: 180,
    },
  });
  const [sortByOptions, setSortByOptions] = useState<string>('');
  const [sortOrderOptions, setSortOrderOptions] = useState<SortOrder>('asc');
  const { recipes, loading } = useRecipes({
    filters: filterOptions,
    sortBy: sortByOptions,
    sortOrder: sortOrderOptions,
  });

  console.log(filterOptions);

  const handleSortChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    const value: string = event.target.value;
    const [newSortBy, newSortOrder]: string[] = value.split('.');
    setSortByOptions(newSortBy);
    setSortOrderOptions(newSortOrder as 'asc' | 'desc');
  };

  function handleCityChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    setFilterOptions((prevFilters) => ({
      ...prevFilters,
      title: value,
    }));
  }

  const handleFilterChange = (
    key: keyof typeof filterOptions,
    value: string
  ) => {
    console.log('Filter key:', key);
    console.log('Filter value:', value);

    setFilterOptions((prevFilters) => ({
      ...prevFilters,
      [key]: value,
    }));
  };

  function handleResetFilters() {
    // Reset the filter options
    // setFilterOptions(defaultFilters);
    // Reset the query parameters
    // router.push({
    //   pathname: '/search',
    //   query: {},
    // });
  }

  console.log(recipes);
  return (
    <section className="px-3 container my-20">
      <div className="grid grid-cols-2 lg:flex lg:items-center lg:justify-between gap-5">
        <div className="col-span-2 flex justify-start">
          <Heading title="Recipes 👩🏾‍🍳" subtitle="Search and filter recipes" />
        </div>
        <div className="relative">
          <span className="text-sm ease-soft leading-5.6 absolute z-10 -ml-px flex h-full items-center px-3 text-slate-500 transition-all">
            <BiSearch size={20} className="text-gray-700" />
          </span>
          <input
            type="text"
            name="city"
            value={filterOptions.title}
            onChange={handleCityChange}
            autoComplete="off"
            spellCheck="false"
            className="pl-10 placeholder-gray-500 border-2 hover:border-secondary border-black focus:border-secondary rounded-xl py-2.5 lg:w-[500px] w-full"
            placeholder="Search recipe here"
          />
        </div>
        <div className="flex bg-black py-3 px-5 text-white rounded-full text-sm justify-center lg:justify-start">
          <p className="hidden lg:block">Sort:</p>
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
          <div className="lg:hidden">
            <BiFilter size={20} />
          </div>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row mt-5 lg:mt-10 gap-10 lg:gap-20 w-full items-center justify-center lg:items-start">
        <div className="lg:w-1/3 xl:w-1/4 w-full">
          <FilterControls
            handleFilterChange={handleFilterChange}
            filterOptions={filterOptions}
            handleResetFilters={handleResetFilters}
            searchResults={0}
          />
        </div>
        <div className="w-full flex items-center justify-center h-auto">
          {loading ? (
            <div className="h-[200px] w-full flex items-center justify-center">
              <BigLoader />
            </div>
          ) : (
            <RecipeResults recipes={recipes} />
          )}
        </div>
      </div>
    </section>
  );
};

export default BrowseRecipes;

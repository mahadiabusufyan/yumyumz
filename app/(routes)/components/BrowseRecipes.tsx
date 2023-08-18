'use client';

import useRecipes from '@/hooks/useRecipes';
import React, { useState } from 'react';

type Props = {};

export type Filters = {
  title?: string;
  cuisine?: string;
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
    cuisine: '',
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

  console.log(recipes);
  return (
    <section className="h-[45vh] md:h-[65vh] px-3 container mt-5">
      BrowseRecipes
    </section>
  );
};

export default BrowseRecipes;

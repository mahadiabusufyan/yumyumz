'use client';

import useAuth from '@/hooks/useAuth';
import useSave from '@/hooks/useSave';
import { Recipe } from '@/types';
import React from 'react';
import TextedSaveBtn from './TextedSaveBtn';

type Props = {
  recipe: Recipe;
  className: string;
};

const FaveRecipe = ({ recipe, className }: Props) => {
  const { user, isAuthenticated } = useAuth();
  const [saved, toggleSaved] = useSave(user?.uid, recipe.id);
  console.log(saved);
  return (
    <div className={className}>
      <TextedSaveBtn
        onClick={toggleSaved}
        saved={saved}
        isAuthenticated={isAuthenticated}
      />
    </div>
  );
};

export default FaveRecipe;

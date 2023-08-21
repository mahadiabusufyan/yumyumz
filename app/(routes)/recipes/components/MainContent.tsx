'use client';

import SaveButton from '@/components/Common/SaveButton';
import useAuth from '@/hooks/useAuth';
import useSave from '@/hooks/useSave';
import { Recipe } from '@/types';
import React from 'react';

type Props = {
  recipe: Recipe;
};

const MainContent = ({ recipe }: Props) => {
  const { user, isAuthenticated, userId } = useAuth();
  const [isFavorite, toggleFavorite] = useSave(userId, recipe.id);

  return (
    <div>
      <SaveButton
        onClick={toggleFavorite}
        saved={isFavorite}
        isAuthenticated={isAuthenticated}
      />
    </div>
  );
};

export default MainContent;

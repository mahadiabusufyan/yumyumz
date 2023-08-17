import getRecipeById from '@/actions/getRecipeById';
import React from 'react';

interface IParams {
  recipeId?: string;
}

const RecipePage = async ({ params }: { params: IParams }) => {
  const recipe = await getRecipeById(params);

  if (!recipe) {
    return null;
  }
  return <div>RecipePage</div>;
};

export default RecipePage;

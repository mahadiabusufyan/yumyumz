import getRecipeById from '@/actions/getRecipeById';
import Header from '@/components/Layout/Header';
import React from 'react';

interface IParams {
  recipeId?: string;
}

const RecipePage = async ({ params }: { params: IParams }) => {
  const recipe = await getRecipeById(params);

  if (!recipe) {
    return null;
  }
  return (
    <div>
      <Header />
      {recipe.data.title}
    </div>
  );
};

export default RecipePage;

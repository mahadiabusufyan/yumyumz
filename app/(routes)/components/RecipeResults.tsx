import RecipeCard from '@/components/Common/RecipeCard';
import EmptyStateAnimation from '@/components/EmptyState';
import { Recipe } from '@/types';
import { useState } from 'react';

interface RecipeResultsProps {
  recipes: Recipe[];
  handleReset?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function RecipeResults({
  recipes,
  handleReset,
}: RecipeResultsProps) {
  const [loading, setLoading] = useState<boolean>(false);

  if (recipes?.length > 0) {
    return (
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 w-full">
        {recipes.map((recipe) => {
          return <RecipeCard key={recipe.id} recipe={recipe} />;
        })}
      </div>
    );
  } else {
    return <EmptyStateAnimation />;
  }
}

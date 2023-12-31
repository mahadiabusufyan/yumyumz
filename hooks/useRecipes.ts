import { useState, useEffect } from 'react';
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  QuerySnapshot,
  Unsubscribe,
  QueryDocumentSnapshot,
  getDocs,
} from 'firebase/firestore';
import { useSearchParams } from 'next/navigation';
import { db } from '../lib/firebase';
import { Recipe } from '@/types';

interface RecipeOptions {
  filters: Record<string, any>;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

const useRecipes = ({ filters, sortBy, sortOrder }: RecipeOptions) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const [unsubscribe, setUnsubscribe] = useState<Unsubscribe | null>(null);

  useEffect(() => {
    const recipesRef = collection(db, 'recipes');
    const queryFilters: ReturnType<typeof where | typeof orderBy>[] = [
      ...(filters.cuisine && filters.cuisine.length
        ? [where('cuisine', 'in', filters.cuisine)]
        : []),
      ...(filters.difficulty && filters.difficulty.length
        ? [where('difficulty', 'in', filters.difficulty)]
        : []),
      ...(filters.cookingTime &&
      filters.cookingTime.min &&
      filters.cookingTime.max
        ? [
            where('cookingTime', '>=', filters.cookingTime.min),
            where('cookingTime', '<=', filters.cookingTime.max),
            orderBy('cookingTime'),
          ]
        : []),
      where('verified', '==', true),
      ...(sortBy && sortOrder ? [orderBy(sortBy, sortOrder)] : []),
    ];

    const hasCookingTimeFilter =
      filters.cookingTime && filters.cookingTime.min && filters.cookingTime.max;
    const hasCookingTimeSort = sortBy === 'cookingTime';

    if (hasCookingTimeFilter && hasCookingTimeSort) {
      queryFilters.pop();
    }

    const handleQuerySnapshot = (querySnap: QuerySnapshot) => {
      const searchTitle = (
        filters.title || searchParams.get('title')
      )?.toLowerCase();

      if (searchTitle) {
        const filteredRecipes: Recipe[] = [];

        querySnap.forEach((doc: QueryDocumentSnapshot) => {
          const title = doc.data().title.toLowerCase();

          if (title.includes(searchTitle)) {
            filteredRecipes.push({
              id: doc.id,
              data: doc.data() as Recipe['data'],
            });
          }
        });

        setRecipes(filteredRecipes);
      } else {
        const recipes: Recipe[] = [];
        querySnap.forEach((doc: QueryDocumentSnapshot) => {
          recipes.push({
            id: doc.id,
            data: doc.data() as Recipe['data'],
          });
        });

        setRecipes(recipes);
      }

      setLoading(false);
    };

    const handleError = (error: Error) => {
      console.error('Error fetching recipes:', error);
      alert('Error fetching recipes');
      setLoading(false);
    };

    const fetchRecipes = async () => {
      try {
        const querySnap = await getDocs(query(recipesRef, ...queryFilters));
        handleQuerySnapshot(querySnap);
      } catch (error: any) {
        handleError(error);
      }
    };

    const unsubscribe = onSnapshot(query(recipesRef, ...queryFilters), {
      next: handleQuerySnapshot,
      error: handleError,
    });

    setUnsubscribe(unsubscribe);
    fetchRecipes();

    return () => {
      if (unsubscribe) {
        unsubscribe();
        setUnsubscribe(null);
      }
    };
  }, [filters, searchParams, sortBy, sortOrder, filters.title]);

  return { recipes, loading };
};

export default useRecipes;

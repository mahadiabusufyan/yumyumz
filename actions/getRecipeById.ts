import { doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Recipe } from '../types';

interface IParams {
  recipeId?: string;
}

export default async function getRecipeById(params: IParams) {
  try {
    const { recipeId } = params;

    const recipeRef = doc(db, 'recipes/' + recipeId);
    const docSnap = await getDoc(recipeRef);

    if (!docSnap.exists()) {
      return null;
    }
    const recipe = {
      id: docSnap.id,
      data: docSnap.data() as Recipe['data'],
    };

    if (recipe) {
      recipe.data.timestamp = recipe.data.timestamp.toDate().toISOString();

      if (!recipe) {
        return null;
      }

      return recipe;
    }
  } catch (error: any) {
    throw new Error(error);
  }
}

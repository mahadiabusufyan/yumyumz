import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Recipe, User } from '../types';

interface IParams {
  recipeId?: string;
  slug?: string;
}

interface UserResult {
  id: string;
  data: User['data'];
}

export default async function getPostedBy(userId: any) {
  try {
    console.log(userId);
    const userRef = doc(db, 'users/' + userId);
    const docSnap = await getDoc(userRef);
    const postedBy: UserResult = {
      id: docSnap.id,
      data: docSnap.data() as User['data'],
    };
    if (postedBy && postedBy.data) {
      postedBy.data.timestamp = postedBy.data.timestamp.toDate().toISOString();
      postedBy.data.lastLoginTimestamp = postedBy.data.lastLoginTimestamp
        .toDate()
        .toISOString();
      if (postedBy.data.lastUpdateTimestamp) {
        postedBy.data.lastUpdateTimestamp = postedBy.data.lastUpdateTimestamp
          .toDate()
          .toISOString();
      }
    }
    return postedBy;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function getRecipeBySlug(params: IParams) {
  try {
    const { slug } = params;

    const recipesCollectionRef = collection(db, 'recipes'); // Assuming 'db' is your Firestore instance
    const querySnapshot = await getDocs(
      query(recipesCollectionRef, where('slug', '==', slug))
    );

    if (querySnapshot.empty) {
      return null;
    }

    const recipeDoc = querySnapshot.docs[0]; // Assuming you're only expecting one recipe per slug

    const recipe = {
      id: recipeDoc.id,
      data: recipeDoc.data() as Recipe['data'],
    };

    recipe.data.timestamp = recipe.data.timestamp.toDate().toISOString();

    return recipe;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function getRecipeById(params: IParams) {
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

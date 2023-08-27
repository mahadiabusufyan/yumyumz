/* eslint-disable @next/next/no-img-element */
import DifficultyIndicator from '@/components/Common/DifficultyIndicator';
import Header from '@/components/Layout/Header';
import Image from 'next/image';
import React from 'react';
import { BsClock } from 'react-icons/bs';
import { Metadata } from 'next';
import MainContent from '../components/MainContent';
import Footer from '@/components/Layout/Footer';
import getPostedBy, { getRecipeBySlug } from '@/app/actions';
import RecipeHeader from '../components/RecipeHeader';
import Carousel from '@/components/Common/Carousel';

interface IParams {
  slug?: string;
}

export const generateMetadata = async ({
  params,
}: {
  params: IParams;
}): Promise<Metadata> => {
  const recipe = await getRecipeBySlug(params);
  const title = recipe?.data.title || '';

  // Capitalize the first letter of each word
  const words = title.toLowerCase().split(' ');
  const capitalizedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1)
  );
  const capitalizedTitle = capitalizedWords.join(' ');

  return {
    title: capitalizedTitle,
  };
};

const RecipePage = async ({ params }: { params: IParams }) => {
  const recipe = await getRecipeBySlug(params);
  const postedBy = await getPostedBy(recipe?.data.ownerRef);
  console.log(postedBy);
  if (!recipe) {
    return null;
  }
  return (
    <main>
      <Header />
      <div className="max-w-5xl mx-auto flex flex-col items-center justify-center px-3">
        <RecipeHeader recipe={recipe} postedBy={postedBy} />
        <Carousel mrItem="mr-5" classes="mb-7 md:mb-9">
          {recipe.data.imgUrls.map((image, i) => (
            <img
              src={image}
              alt={recipe.data.title}
              className="inline-block aspect-[3/2] w-[300px] rounded-lg object-cover md:w-[400px] md:rounded-xl xl:w-[480px]"
              width={2000}
              height={1000}
              key={`image-${i}`}
            />
          ))}
        </Carousel>
        <div className="mt-5 flex items-center justify-start gap-3">
          <div className="h-[100px] bg-green-100 w-[100px] flex flex-col items-center justify-center rounded-3xl">
            <BsClock size={40} className="text-green-500" />
            <span className="text-green-700">
              {recipe.data.cookingTime} min
            </span>
          </div>
          {recipe.data.difficulty && (
            <DifficultyIndicator difficulty={recipe.data.difficulty} />
          )}
        </div>
        {recipe.data.instructions && (
          <div dangerouslySetInnerHTML={{ __html: recipe.data.instructions }} />
        )}

        <MainContent recipe={recipe} />
      </div>
      <Footer />
    </main>
  );
};

export default RecipePage;

/* eslint-disable @next/next/no-img-element */
import DifficultyIndicator from '@/components/Common/DifficultyIndicator';
import Header from '@/components/Layout/Header';
import React from 'react';
import { BsClock } from 'react-icons/bs';
import { Metadata } from 'next';
import Footer from '@/components/Layout/Footer';
import getPostedBy, { getRecipeBySlug } from '@/app/actions';
import RecipeHeader from '../components/RecipeHeader';
import Carousel from '@/components/Common/Carousel';
import ShareRecipe from '@/components/Common/ShareRecipe';
import FaveRecipe from '../components/FaveRecipe';
import Heading from '@/components/Common/Heading';

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
      <div className="max-w-5xl mx-auto px-3">
        <div className="flex flex-col items-center justify-center">
          {' '}
          <RecipeHeader recipe={recipe} postedBy={postedBy} />
          <div className="relative">
            {' '}
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
            <FaveRecipe recipe={recipe} className="absolute right-5 top-4" />
          </div>
        </div>
        <ShareRecipe recipe={recipe} />

        <div className="mt-10 gap-3">
          <Heading title={'Details'} />
          <div className="mt-5 flex items-center justify-start gap-5">
            {' '}
            <div className="h-[100px] bg-green-100 w-[100px] flex flex-col items-center justify-center rounded-xl">
              <BsClock size={40} className="text-green-500" />
              <span className="text-green-700">
                {recipe.data.cookingTime} min
              </span>
            </div>
            {recipe.data.difficulty && (
              <DifficultyIndicator difficulty={recipe.data.difficulty} />
            )}
          </div>
        </div>
        <div className="text-lg lg:text-xl gap-5 mt-10">
          <Heading title={'Instructions'} />
          {recipe.data.instructions && (
            <div
              className="prose prose-blue max-w-full mt-5"
              dangerouslySetInnerHTML={{ __html: recipe.data.instructions }}
            />
          )}
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default RecipePage;

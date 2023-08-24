'use client';

import UserPicture from '@/components/Common/UserPicture';
import { Recipe, User } from '@/types';
import React from 'react';
import Moment from 'react-moment';

type Props = {
  recipe: Recipe;
  postedBy: User;
};

const RecipeHeader = ({ recipe, postedBy }: Props) => {
  return (
    <div className="w-full flex flex-col lg:flex-row lg:items-center lg:justify-between py-5 gap-3">
      <div>
        <h3 className="text-3xl lg:text-3xl font-bold capitalize">
          {recipe.data.title}
        </h3>
      </div>
      <div className="flex gap-3">
        <UserPicture src={postedBy.data.photoURL} />
        <div>
          <p className="text-sm text-gray-400">
            by{' '}
            <span className="text-black">{`${postedBy.data.firstName} ${postedBy.data.lastName}`}</span>
          </p>
          <p className="text-sm text-gray-400">
            on{' '}
            <span className="text-black">
              <Moment format="DD MMMM YYYY">{recipe?.data?.timestamp}</Moment>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RecipeHeader;

'use client';

import { Recipe } from '@/types';
import {
  BsFacebook,
  BsLinkedin,
  BsPinterest,
  BsTwitter,
  BsWhatsapp,
} from 'react-icons/bs';
import { IoCopyOutline } from 'react-icons/io5';

interface ShareRecipeProps {
  recipe: Recipe;
}

const ShareRecipe = ({ recipe }: ShareRecipeProps) => {
  const shareOnFacebook = () => {
    const additionalText = 'Check out this recipe: ';
    const recipeLink = `yumyumz.vercel.app/recipes/${recipe.id}`;
    const recipeDesc = `${recipe.data.title}`;
    const shareText = `${additionalText}${recipeDesc} ${recipeLink}`;
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      shareText
    )}`;
    window.open(facebookShareUrl, '_blank');
  };

  const shareOnTwitter = () => {
    const additionalText = 'Check out this recipe: ';
    const recipeLink = `yumyumz.vercel.app/recipes//recipes/${recipe.id}`;
    const recipeDesc = `${recipe.data.title}`;
    const tweetText = `${additionalText}${recipeDesc} ${recipeLink}`;
    const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      tweetText
    )}`;
    window.open(twitterShareUrl, '_blank');
  };

  const shareOnPinterest = () => {
    // Additional text and link
    const recipeLink = `yumyumz.vercel.app/recipes//recipes/${recipe.id}`;

    // Create the Pinterest sharing URL by encoding the recipe URL, image URL, and description
    const pinterestShareUrl = `https://www.pinterest.com/pin/create/button/?url=${encodeURIComponent(
      recipeLink
    )}&media=${encodeURIComponent(
      recipe.data.imgUrls[0]
    )}&description=${encodeURIComponent(recipe.data.title)}`;

    // Open a new window or redirect to the Pinterest sharing URL
    window.open(pinterestShareUrl, '_blank');
  };

  const shareOnLinkedIn = () => {
    // Additional text and link
    const recipeLink = `yumyumz.vercel.app/recipes//recipes/${recipe.id}`;

    // Create the LinkedIn sharing URL by encoding the recipe URL
    const linkedInShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      recipeLink
    )}`;

    // Open a new window or redirect to the LinkedIn sharing URL
    window.open(linkedInShareUrl, '_blank');
  };

  const shareOnWhatsApp = () => {
    const recipeLink = `yumyumz.vercel.app/recipes//recipes/${recipe.id}`;
    const whatsappShareUrl = `https://wa.me/?text=${encodeURIComponent(
      recipeLink
    )}`;
    window.open(whatsappShareUrl, '_blank');
  };
  return (
    <div className="flex items-center gap-5 text-[#013737] text-xs w-full">
      <button
        className="flex items-center justify-start text-lg transform hover:scale-105 transition duration-300"
        onClick={shareOnFacebook}
      >
        <BsFacebook size={25} className="mr-2 text-[#013737]" />
      </button>
      <button
        className="flex items-center justify-start text-lg transform hover:scale-105 transition duration-300"
        onClick={shareOnTwitter}
      >
        <BsTwitter size={25} className="mr-2 text-[#013737]" />
      </button>
      <button
        className="flex items-center justify-start text-lg transform hover:scale-105 transition duration-300"
        onClick={shareOnPinterest}
      >
        <BsPinterest size={25} className="mr-2 text-[#013737]" />
      </button>
      <button
        className="flex items-center justify-start text-lg transform hover:scale-105 transition duration-300"
        onClick={shareOnLinkedIn}
      >
        <BsLinkedin size={25} className="mr-2 text-[#013737]" />
      </button>
      <button
        className="flex items-center justify-start text-lg transform hover:scale-105 transition duration-300"
        onClick={shareOnWhatsApp}
      >
        <BsWhatsapp size={25} className="mr-2 text-[#013737]" />
      </button>
    </div>
  );
};

export default ShareRecipe;

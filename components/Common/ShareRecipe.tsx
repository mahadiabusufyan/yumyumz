'use client';

import { Recipe } from '@/types';
import { BiLogoFacebook } from 'react-icons/bi';
import {
  BsFacebook,
  BsLinkedin,
  BsPinterest,
  BsShareFill,
  BsTwitter,
  BsWhatsapp,
} from 'react-icons/bs';
import { IoCopyOutline } from 'react-icons/io5';

interface ShareRecipeProps {
  recipe: Recipe;
}

const ShareRecipe = ({ recipe }: ShareRecipeProps) => {
  const currentURL = window.location.href;
  const shareOnFacebook = () => {
    const additionalText = 'Check out this recipe: ';

    const recipeDesc = `${recipe.data.title}`;
    const shareText = `${additionalText}${recipeDesc} ${currentURL}`;
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      shareText
    )}`;
    window.open(facebookShareUrl, '_blank');
  };

  const shareOnTwitter = () => {
    const additionalText = 'Check out this recipe: ';

    const recipeDesc = `${recipe.data.title}`;
    const tweetText = `${additionalText}${recipeDesc} ${currentURL}`;
    const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      tweetText
    )}`;
    window.open(twitterShareUrl, '_blank');
  };

  const shareOnPinterest = () => {
    // Additional text and link

    // Create the Pinterest sharing URL by encoding the recipe URL, image URL, and description
    const pinterestShareUrl = `https://www.pinterest.com/pin/create/button/?url=${encodeURIComponent(
      currentURL
    )}&media=${encodeURIComponent(
      recipe.data.imgUrls[0]
    )}&description=${encodeURIComponent(recipe.data.title)}`;

    // Open a new window or redirect to the Pinterest sharing URL
    window.open(pinterestShareUrl, '_blank');
  };

  const shareOnLinkedIn = () => {
    // Additional text and link

    // Create the LinkedIn sharing URL by encoding the recipe URL
    const linkedInShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      currentURL
    )}`;

    // Open a new window or redirect to the LinkedIn sharing URL
    window.open(linkedInShareUrl, '_blank');
  };

  const shareOnWhatsApp = () => {
    const whatsappShareUrl = `https://wa.me/?text=${encodeURIComponent(
      currentURL
    )}`;
    window.open(whatsappShareUrl, '_blank');
  };
  return (
    <div className="flex items-center gap-2 text-xs w-full">
      <div className="text-sm flex items-center justify-center p-2 px-3 rounded-full border">
        <BsShareFill size={10} className="mr-1" />{' '}
        <span className="hidden md:inline-flex">Share</span>
      </div>
      <button
        className="text-sm flex items-center justify-center p-2 px-3 rounded-full border bg-[#31426D] text-white transform hover:scale-105 transition duration-300"
        onClick={shareOnFacebook}
      >
        <BiLogoFacebook size={15} className="md:mr-1" />{' '}
        <span className="hidden md:inline-flex">Facebook</span>
      </button>
      <button
        className="text-sm flex items-center justify-center p-2 px-3 rounded-full border bg-[#1E9CEA] text-white transform hover:scale-105 transition duration-300"
        onClick={shareOnTwitter}
      >
        <BsTwitter size={15} className="md:mr-1" />{' '}
        <span className="hidden md:inline-flex">Twitter</span>
      </button>
      <button
        className="text-sm flex items-center justify-center p-2 px-3 rounded-full border bg-[#DE0322] text-white transform hover:scale-105 transition duration-300"
        onClick={shareOnPinterest}
      >
        <BsPinterest size={15} className="md:mr-1" />{' '}
        <span className="hidden md:inline-flex">Pinterest</span>
      </button>
      <button
        className="text-sm flex items-center justify-center p-2 px-3 rounded-full border bg-[#0173AF] text-white transform hover:scale-105 transition duration-300"
        onClick={shareOnLinkedIn}
      >
        <BsLinkedin size={15} className="md:mr-1" />{' '}
        <span className="hidden md:inline-flex">LinkedIn</span>
      </button>
      <button
        className="text-sm flex items-center justify-center p-2 px-3 rounded-full border bg-[#2CD065] text-white transform hover:scale-105 transition duration-300"
        onClick={shareOnWhatsApp}
      >
        <BsWhatsapp size={15} className="md:mr-1" />
        <span className="hidden md:inline-flex">WhatsApp</span>
      </button>
    </div>
  );
};

export default ShareRecipe;

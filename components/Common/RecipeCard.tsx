import useAuth from '@/hooks/useAuth';
import { Recipe } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { BsClock, BsStar } from 'react-icons/bs';
import SmallDifficultyIndicator from './SmallDifficultyIndicator';

type Props = {
  recipe: Recipe;
  onDelete?: (id: string) => void;
  onEdit?: (id: string) => void;
};

export default function PropertySearchItem({
  recipe,
  onDelete,
  onEdit,
}: Props) {
  return (
    <article className="flex flex-col w-full ">
      <div className="relative w-full rounded-2xl">
        <div className="h-full w-full relative rounded-2xl overflow-hidden">
          <Link href={`/recipes/${recipe.data.slug}`}>
            <div className="aspect-video w-full flex items-center justify-center rounded">
              <Image
                height={200}
                width={200}
                src={recipe.data.imgUrls[0]}
                className="rounded-2xl w-full h-[260px] md:h-[210px] lg:h-[160px] object-cover"
                alt="Loading..."
              />
            </div>
          </Link>
        </div>
      </div>
      <div>
        <h3 className="text-lg font-bold">{recipe.data.title}</h3>
        {/* <h3 className="text-gray-400">by Mahadi</h3> */}
        <div className="flex items-center justify-between">
          {/* <div className="flex items-center gap-1">
            <BsStar />
            <p>4.7</p>
            <p>(24)</p>
          </div> */}
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center">
              <BsClock size={15} className="text-green-500 mr-2" />
              <span className="text-sm font-medium">
                {recipe.data.cookingTime} min
              </span>
            </div>
            {recipe.data.difficulty && (
              <SmallDifficultyIndicator difficulty={recipe.data.difficulty} />
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

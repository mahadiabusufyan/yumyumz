import { useRouter } from 'next/navigation';
import { IoBookmark, IoBookmarkOutline } from 'react-icons/io5';

interface Props {
  onClick: boolean | (() => Promise<void>);
  saved: boolean | (() => Promise<void>);
  isAuthenticated: boolean;
}

const SaveButton: React.FC<Props> = ({ onClick, saved, isAuthenticated }) => {
  const router = useRouter();
  const handleClick = async () => {
    if (isAuthenticated) {
      if (typeof onClick === 'function') {
        await onClick();
      }
    } else {
      router.push('/auth/login');
    }
  };
  console.log(saved);
  return (
    <button
      onClick={handleClick}
      className="flex items-center cursor-pointer uppercase text-xs text-gray-600 tracking-wide"
    >
      {' '}
      <div className=" relative hover:opacity-80 transition ">
        <IoBookmarkOutline
          size={28}
          className="fill-white absolute -top-[2px] -right-[2px]"
        />
        <IoBookmark
          size={24}
          className={saved ? 'fill-primary' : 'fill-white/70'}
        />{' '}
      </div>
      {/* <span className="ml-2">Save</span> */}
    </button>
  );
};

export default SaveButton;

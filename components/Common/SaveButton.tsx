import { useRouter } from 'next/navigation';
import { BiBookmarkMinus, BiBookmarkPlus } from 'react-icons/bi';
import Tooltip from './Tooltip';

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
      router.push('/login');
    }
  };
  console.log(saved);
  return (
    <div>
      {saved ? (
        <div>
          {' '}
          <button
            data-tooltip-id="remove"
            onClick={handleClick}
            className="bg-white p-2 rounded-lg"
          >
            <BiBookmarkMinus size={20} />
          </button>
          <Tooltip id={'remove'} content={'Remove'} />
        </div>
      ) : (
        <div>
          {' '}
          <button
            data-tooltip-id="save"
            onClick={handleClick}
            className="bg-white p-2 rounded-lg"
          >
            <BiBookmarkPlus size={20} className={``} />
          </button>
          <Tooltip id={'save'} content={'Save'} />
        </div>
      )}
    </div>
    // <button
    //   onClick={handleClick}
    //   onMouseEnter={() => setIsHovering(true)}
    //   onMouseLeave={() => setIsHovering(false)}
    //   className=" relative hover:opacity-80 transition cursor-pointer"
    // >
    //   <AiOutlineHeart
    //     size={32}
    //     className="fill-white absolute -top-[2px] -right-[2px]"
    //   />
    //   <AiFillHeart
    //     size={28}
    //     className={saved ? 'fill-red-500' : 'fill-gray-600/60'}
    //   />
    // </button>
  );
};

export default SaveButton;

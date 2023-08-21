import { useState } from 'react';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
// import useLoginModal from '../../hooks/useLoginModal';

interface Props {
  onClick: boolean | (() => Promise<void>);
  saved: boolean | (() => Promise<void>);
  isAuthenticated: boolean;
}

const SaveButton: React.FC<Props> = ({ onClick, saved, isAuthenticated }) => {
  const [isHovering, setIsHovering] = useState(false);
  // const loginModal = useLoginModal();

  const handleClick = async () => {
    if (isAuthenticated) {
      if (typeof onClick === 'function') {
        await onClick();
      }
    } else {
      // loginModal.onOpen(); // Call onOpen to open the login modal
    }
  };

  return (
    <button
      onClick={handleClick}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className=" relative hover:opacity-80 transition cursor-pointer"
    >
      <AiOutlineHeart
        size={32}
        className="fill-white absolute -top-[2px] -right-[2px]"
      />
      <AiFillHeart
        size={28}
        className={saved ? 'fill-red-500' : 'fill-gray-600/60'}
      />
    </button>
  );
};

export default SaveButton;

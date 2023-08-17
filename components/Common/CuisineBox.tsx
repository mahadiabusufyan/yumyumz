import React from 'react';

interface CuisineBoxProps {
  label: string;
  selected?: boolean;
  onClick: (value: string) => void;
}

const CuisineBox: React.FC<CuisineBoxProps> = ({
  label,
  selected,
  onClick,
}) => {
  return (
    <div
      onClick={() => onClick(label)}
      className={`rounded-lg border-2 p-2 flex flex-col gap-2 hover:border-[#de79fb] hover:drop-shadow-xl transition duration-300 cursor-pointer
        ${
          selected
            ? 'border-[#de79fb] bg-[#de79fb]/40 text-black'
            : 'border-neutral-200'
        }
      `}
    >
      <div className="font-medium">{label}</div>
    </div>
  );
};

export default CuisineBox;

import React from 'react';

interface CuisineBoxProps {
  value: string;
  label: string;
  selected?: boolean;
  onClick: (value: string) => void;
}

const CuisineBox: React.FC<CuisineBoxProps> = ({
  value,
  label,
  selected,
  onClick,
}) => {
  return (
    <div
      onClick={() => onClick(value)}
      className={`rounded-lg border-2 p-2 flex flex-col gap-2 hover:border-secondary hover:drop-shadow-xl transition duration-300 cursor-pointer
        ${
          selected
            ? 'border-secondary bg-secondary/40 text-black'
            : 'border-neutral-200'
        }
      `}
    >
      <div className="font-medium">{label}</div>
    </div>
  );
};

export default CuisineBox;

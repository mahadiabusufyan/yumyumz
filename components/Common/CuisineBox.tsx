'use client';

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
      className={`
        rounded-xl
        border-2
        p-4
        flex
        flex-col
        gap-3
        hover:border-[#de79fb]
        transition
        cursor-pointer
        ${
          selected
            ? 'border-[#de79fb] bg-[#de79fb]/40 text-black'
            : 'border-neutral-200'
        }
      `}
    >
      <div className="font-semibold">{label}</div>
    </div>
  );
};

export default CuisineBox;

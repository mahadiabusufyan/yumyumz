import React from 'react';
import { BsPersonWorkspace } from 'react-icons/bs';

interface DifficultyIndicatorProps {
  difficulty: string;
}

const DifficultyIndicator: React.FC<DifficultyIndicatorProps> = ({
  difficulty,
}) => {
  let colorClass = '';
  let text = '';
  let textColor = '';

  switch (difficulty) {
    case 'easy':
      colorClass = 'bg-yellow-300';
      textColor = 'text-yellow-700';
      text = 'Easy';
      break;
    case 'normal':
      colorClass = 'bg-green-300';
      textColor = 'text-green-700';
      text = 'Normal';
      break;
    case 'hard':
      colorClass = 'bg-red-300';
      textColor = 'text-red-700';
      text = 'Hard';
      break;
    default:
      break;
  }

  return (
    <div
      className={`h-[100px] w-[100px] flex flex-col items-center justify-center rounded-3xl ${colorClass}`}
    >
      <BsPersonWorkspace size={40} className={`${textColor}`} />
      <span className={`${textColor} font-bold`}>{text}</span>
    </div>
  );
};

export default DifficultyIndicator;

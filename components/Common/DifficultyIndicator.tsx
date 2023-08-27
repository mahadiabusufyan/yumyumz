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
      colorClass = 'bg-yellow-100';
      textColor = 'text-yellow-600';
      text = 'Easy';
      break;
    case 'normal':
      colorClass = 'bg-green-100';
      textColor = 'text-green-600';
      text = 'Normal';
      break;
    case 'hard':
      colorClass = 'bg-red-100';
      textColor = 'text-red-600';
      text = 'Hard';
      break;
    default:
      break;
  }

  return (
    <div
      className={`h-[100px] w-[100px] flex flex-col items-center justify-center rounded-xl ${colorClass}`}
    >
      <BsPersonWorkspace size={40} className={`${textColor}`} />
      <span className={`${textColor} font-medium`}>{text}</span>
    </div>
  );
};

export default DifficultyIndicator;

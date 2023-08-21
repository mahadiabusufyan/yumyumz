import React from 'react';
import { BsPersonWorkspace } from 'react-icons/bs';

interface SmallDifficultyIndicatorProps {
  difficulty: string;
}

const SmallDifficultyIndicator: React.FC<SmallDifficultyIndicatorProps> = ({
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
    <div className={`flex items-center justify-center`}>
      <BsPersonWorkspace size={15} className={`${textColor} mr-2`} />
      <span className={`${textColor} font-medium`}>{text}</span>
    </div>
  );
};

export default SmallDifficultyIndicator;

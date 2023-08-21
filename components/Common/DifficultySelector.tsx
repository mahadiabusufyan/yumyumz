import React from 'react';

interface DifficultySelectorProps {
  selectedDifficulty: string;
  onChange: (difficulty: string) => void;
}

const DifficultySelector: React.FC<DifficultySelectorProps> = ({
  selectedDifficulty,
  onChange,
}) => {
  const difficultyOptions = [
    { label: 'Easy', value: 'easy' },
    { label: 'Medium', value: 'medium' },
    { label: 'Hard', value: 'hard' },
  ];

  return (
    <div className="flex flex-col">
      <div className="gap-3 mb-2 text-lg">
        <h2 className=" font-semibold ">Difficulty</h2>
      </div>

      <div className="flex justify-start items-center space-x-4">
        {difficultyOptions.map((option) => (
          <label
            key={option.value}
            className={`cursor-pointer border p-5 rounded-xl ${
              selectedDifficulty === option.value
                ? 'bg-secondary text-white'
                : 'bg-white text-gray-700 hover:bg-secondary transition duration-300'
            }`}
          >
            <input
              type="radio"
              value={option.value}
              checked={selectedDifficulty === option.value}
              onChange={() => onChange(option.value)}
              className="hidden"
            />
            {option.label}
          </label>
        ))}
      </div>
    </div>
  );
};

export default DifficultySelector;

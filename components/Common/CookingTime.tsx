import React from 'react';

interface CookingTimeProps {
  onChange: (value: number) => void;
  value: number;
}

const CookingTime: React.FC<CookingTimeProps> = ({ onChange, value }) => {
  const handleCookingTimeChange = (newValue: number) => {
    onChange(newValue);
  };

  return (
    <div className="">
      <div className="flex items-center gap-3 mb-2 text-lg">
        <h2 className=" font-semibold ">Estimated Cooking Time</h2>
        <p className="text-gray-500">{value} minutes</p>
      </div>
      <input
        type="range"
        min={5}
        max={180}
        step={5}
        value={value}
        onChange={(e) => handleCookingTimeChange(parseInt(e.target.value))}
        className="w-full appearance-none bg-transparent [&::-webkit-slider-runnable-track]:rounded-xl [&::-webkit-slider-runnable-track]:bg-gray-200 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-[30px] [&::-webkit-slider-thumb]:w-[50px] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-secondary cursor-pointer transition-all duration-500"
      />
      <div className="flex justify-between text-sm text-gray-800">
        <span>5 minutes</span>
        <span>180 minutes</span>
      </div>
    </div>
  );
};

export default CookingTime;

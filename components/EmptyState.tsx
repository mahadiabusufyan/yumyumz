// components/EmptyStateAnimation.tsx

import React from 'react';

const EmptyStateAnimation: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[50vh]">
      <div className="w-20 h-20 bg-secondary rounded-full animate-pulse"></div>
      <p className="mt-4 text-gray-600 text-center">No recipes found.</p>
    </div>
  );
};

export default EmptyStateAnimation;

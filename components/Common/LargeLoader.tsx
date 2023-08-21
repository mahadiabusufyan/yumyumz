import React from 'react';

const LargeLoader = () => {
  return (
    <div role="status" className="flex items-center justify-center h-full">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 120 101"
        className="w-6 h-6"
        fill="none"
      >
        <circle cx="25" cy="50" r="10" fill="white">
          <animate
            attributeName="r"
            from="12"
            to="12"
            begin="0s"
            dur="0.8s"
            values="12;20;12"
            calcMode="linear"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="60" cy="50" r="10" fill="white">
          <animate
            attributeName="r"
            from="12"
            to="12"
            begin="0.2s"
            dur="0.8s"
            values="12;20;12"
            calcMode="linear"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="95" cy="50" r="10" fill="white">
          <animate
            attributeName="r"
            from="12"
            to="12"
            begin="0.4s"
            dur="0.8s"
            values="12;20;12"
            calcMode="linear"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default LargeLoader;

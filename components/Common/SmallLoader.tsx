import React from 'react';

type Props = {
  white?: boolean; // Prop to determine the fill color
};

const SmallLoader = ({ white }: Props) => {
  const fillColor = white ? '#fff' : '#000';

  return (
    <svg
      version="1.1"
      id="L9"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 30 30" // Reduced viewBox dimensions
      enable-background="new 0 0 0 0"
      xmlSpace="preserve"
      style={{
        width: '23px',
        height: '23px',
        display: 'inline-block',
      }}
    >
      <rect x="10" y="7.5" width="2" height="5" fill={fillColor}>
        {' '}
        <animateTransform
          attributeType="xml"
          attributeName="transform"
          type="translate"
          values="0 0; 0 10; 0 0"
          begin="0"
          dur="0.6s"
          repeatCount="indefinite"
        />
      </rect>
      <rect x="15" y="7.5" width="2" height="5" fill={fillColor}>
        {' '}
        <animateTransform
          attributeType="xml"
          attributeName="transform"
          type="translate"
          values="0 0; 0 10; 0 0"
          begin="0.2s"
          dur="0.6s"
          repeatCount="indefinite"
        />
      </rect>
      <rect x="20" y="7.5" width="2" height="5" fill={fillColor}>
        {' '}
        <animateTransform
          attributeType="xml"
          attributeName="transform"
          type="translate"
          values="0 0; 0 10; 0 0"
          begin="0.4s"
          dur="0.6s"
          repeatCount="indefinite"
        />
      </rect>
    </svg>
  );
};

export default SmallLoader;

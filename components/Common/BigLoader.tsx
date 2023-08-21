import React from 'react';

type Props = {
  white?: boolean; // Prop to determine the fill color
};

const BigLoader = ({ white }: Props) => {
  const fillColor = white ? '#fff' : '#000';

  return (
    <svg
      version="1.1"
      id="L9"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 50 50"
      enable-background="new 0 0 0 0"
      xmlSpace="preserve"
      style={{
        width: '100px',
        height: '100px',
        margin: '20px',
        display: 'inline-block',
      }}
    >
      <rect x="20" y="15" width="4" height="10" fill={fillColor}>
        <animateTransform
          attributeType="xml"
          attributeName="transform"
          type="translate"
          values="0 0; 0 20; 0 0"
          begin="0"
          dur="0.6s"
          repeatCount="indefinite"
        />
      </rect>
      <rect x="30" y="15" width="4" height="10" fill={fillColor}>
        <animateTransform
          attributeType="xml"
          attributeName="transform"
          type="translate"
          values="0 0; 0 20; 0 0"
          begin="0.2s"
          dur="0.6s"
          repeatCount="indefinite"
        />
      </rect>
      <rect x="40" y="15" width="4" height="10" fill={fillColor}>
        <animateTransform
          attributeType="xml"
          attributeName="transform"
          type="translate"
          values="0 0; 0 20; 0 0"
          begin="0.4s"
          dur="0.6s"
          repeatCount="indefinite"
        />
      </rect>
    </svg>
  );
};

export default BigLoader;

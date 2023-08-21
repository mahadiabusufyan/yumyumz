import React from 'react';
import { Tooltip as ReactTooltip } from 'react-tooltip';

interface TooltipProps {
  id: string;
  content: string;
}

const Tooltip: React.FC<TooltipProps> = ({ id, content }) => {
  const tooltipStyle = {
    backgroundColor: '#D5B4B4',
    color: '#000000',
    borderRadius: '8px',
    padding: '8px 12px',
    fontSize: '14px',
  };

  return (
    <ReactTooltip
      place="bottom"
      id={id}
      content={content}
      style={tooltipStyle}
    />
  );
};

export default Tooltip;

import React, { ReactNode } from 'react';

interface TooltipProps {
  text: string;
  children: ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ text, children }) => {
  return (
    <div className="relative group inline-block">
      {children}
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2">
        {text}
      </div>
    </div>
  );
};

export default Tooltip;


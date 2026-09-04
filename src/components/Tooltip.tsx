import React, { ReactNode } from 'react';

interface TooltipProps {
  text: string;
  children: ReactNode;
}

export const Tooltip: React.FC<TooltipProps> = ({ text, children }) => (
  <div className="relative inline-block group">
    {children}
    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block whitespace-nowrap bg-black/75 text-white text-xs rounded py-1 px-2 z-10">
      {text}
    </div>
    {/* Arrow */}
    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 hidden group-hover:block w-2 h-2 bg-black/75 rotate-45 z-10"></div>
  </div>
);

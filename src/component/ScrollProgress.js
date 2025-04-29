import React from 'react';

const ScrollProgress = ({ progress }) => {
  return (
    <div className="fixed left-0 w-full h-1 bg-gray-200 z-50">
      <div 
        className="h-full bg-red-700 transition-all duration-300"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default ScrollProgress;
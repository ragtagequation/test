import React from 'react';

export const Button = ({ children, onClick, className }) => (
  <button
    className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${className}`}
    onClick={onClick}
  >
    {children}
  </button>
);
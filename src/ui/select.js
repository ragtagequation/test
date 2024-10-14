import React from 'react';

export const Select = ({ children, onValueChange, value, className }) => (
  <select 
    value={value} 
    onChange={(e) => onValueChange(e.target.value)}
    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${className}`}
  >
    {children}
  </select>
);

export const SelectItem = ({ children, value }) => (
  <option value={value}>{children}</option>
);
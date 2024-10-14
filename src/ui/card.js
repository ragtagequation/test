import React from 'react';

export const Card = ({ children, className }) => (
  <div className={`bg-white shadow-lg rounded-lg overflow-hidden ${className}`}>{children}</div>
);

export const CardHeader = ({ children, className }) => (
  <div className={`p-4 ${className}`}>{children}</div>
);

export const CardContent = ({ children, className }) => (
  <div className={`p-4 ${className}`}>{children}</div>
);
import React from 'react';

interface ThemeDisplayProps {
  theme: string;
}

const ThemeDisplay = ({ theme }: ThemeDisplayProps) => (
  <div className="text-center text-xl font-semibold">
    Tema atual: <span className="text-blue-600">{theme}</span>
  </div>
);

export default ThemeDisplay;

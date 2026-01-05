'use client';

import React, { createContext, useState, ReactNode } from 'react';

type FontContextType = {
  font: string;
  setFont: (font: string) => void;
};

export const FontContext = createContext<FontContextType>({
  font: 'font-inter',
  setFont: () => {},
});

export const FontProvider = ({ children }: { children: ReactNode }) => {
  const [font, setFont] = useState('font-inter');

  return (
    <FontContext.Provider value={{ font, setFont }}>
      {children}
    </FontContext.Provider>
  );
};

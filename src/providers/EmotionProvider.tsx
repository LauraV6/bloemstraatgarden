'use client';

import { ReactNode } from 'react';
import { ThemeProvider } from '@emotion/react';
import { theme } from '@/styles/theme';
import { GlobalStyles } from '@/styles/GlobalStyles';

interface EmotionProviderProps {
  children: ReactNode;
}

export function EmotionProvider({ children }: EmotionProviderProps) {
  // Single theme object — colors use CSS custom properties that resolve
  // based on data-theme attribute, so no theme switching needed here.
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {children}
    </ThemeProvider>
  );
}

'use client';

import { ReactNode, useEffect, useState } from 'react';
import { ThemeProvider } from '@emotion/react';
import { useTheme } from 'next-themes';
import { theme } from '@/styles/theme';
import { GlobalStyles } from '@/styles/GlobalStyles';

interface EmotionProviderProps {
  children: ReactNode;
}

export function EmotionProvider({ children }: EmotionProviderProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Update logo SVG fills for dark mode (SVG fill can't use CSS variables)
  useEffect(() => {
    if (mounted && typeof document !== 'undefined') {
      const isDark = resolvedTheme === 'dark';

      const updateLogoColors = () => {
        const logoTexts = document.querySelectorAll('.st3');
        logoTexts.forEach((text) => {
          const el = text as SVGElement;
          el.style.setProperty('fill', isDark ? '#ffffff' : '#000000', 'important');
        });
      };

      updateLogoColors();
      setTimeout(updateLogoColors, 100);
      setTimeout(updateLogoColors, 500);

      const observer = new MutationObserver(() => {
        updateLogoColors();
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true
      });

      return () => {
        observer.disconnect();
      };
    }
  }, [mounted, resolvedTheme]);

  // Single theme object — colors use CSS custom properties that resolve
  // based on data-theme attribute, so no theme switching needed here.
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {children}
    </ThemeProvider>
  );
}

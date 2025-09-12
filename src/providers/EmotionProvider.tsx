'use client';

import { ReactNode, useEffect, useState } from 'react';
import { ThemeProvider } from '@emotion/react';
import { useTheme } from 'next-themes';
import { lightTheme, darkTheme } from '@/styles/theme';
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

  // Directly update body and heading styles as a workaround
  useEffect(() => {
    if (mounted && typeof document !== 'undefined') {
      const isDark = resolvedTheme === 'dark';
      document.body.style.backgroundColor = isDark ? '#23252a' : '#ffffff';
      document.body.style.color = isDark ? 'hsl(0, 0%, 100%)' : 'hsl(220, 38%, 11%)';
      
      // Function to update logo colors only (headings and buttons handled via CSS)
      const updateLogoColors = () => {
        // Update logo text colors (.st3 class)
        const logoTexts = document.querySelectorAll('.st3');
        logoTexts.forEach((text) => {
          const el = text as SVGElement;
          // In light mode: black, in dark mode: white
          el.style.setProperty('fill', isDark ? '#ffffff' : '#000000', 'important');
        });
      };
      
      // Initial update
      updateLogoColors();
      
      // Update after a short delay to catch dynamically rendered content
      setTimeout(updateLogoColors, 100);
      setTimeout(updateLogoColors, 500);
      
      // Set up MutationObserver to watch for new logos
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

  // Determine which theme to use
  const emotionTheme = mounted && resolvedTheme === 'dark' ? darkTheme : lightTheme;

  // Add key to force complete re-render when theme changes
  return (
    <ThemeProvider theme={emotionTheme} key={resolvedTheme}>
      <GlobalStyles />
      {children}
    </ThemeProvider>
  );
}
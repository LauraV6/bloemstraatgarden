/**
 * Breakpoint System
 * Responsive design breakpoints and utilities
 */

import { css } from '@emotion/react';

// Breakpoint values
export const breakpoints = {
  xs: 480,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

// Breakpoint strings for use in styled components
export const breakpointStrings = {
  xs: `${breakpoints.xs}px`,
  sm: `${breakpoints.sm}px`,
  md: `${breakpoints.md}px`,
  lg: `${breakpoints.lg}px`,
  xl: `${breakpoints.xl}px`,
  '2xl': `${breakpoints['2xl']}px`,
} as const;

// Media query helpers
export const media = {
  // Min-width queries (mobile-first)
  up: {
    xs: `@media (min-width: ${breakpoints.xs}px)`,
    sm: `@media (min-width: ${breakpoints.sm}px)`,
    md: `@media (min-width: ${breakpoints.md}px)`,
    lg: `@media (min-width: ${breakpoints.lg}px)`,
    xl: `@media (min-width: ${breakpoints.xl}px)`,
    '2xl': `@media (min-width: ${breakpoints['2xl']}px)`,
  },

  // Max-width queries (desktop-first)
  down: {
    xs: `@media (max-width: ${breakpoints.xs - 1}px)`,
    sm: `@media (max-width: ${breakpoints.sm - 1}px)`,
    md: `@media (max-width: ${breakpoints.md - 1}px)`,
    lg: `@media (max-width: ${breakpoints.lg - 1}px)`,
    xl: `@media (max-width: ${breakpoints.xl - 1}px)`,
    '2xl': `@media (max-width: ${breakpoints['2xl'] - 1}px)`,
  },

  // Between queries
  between: (min: keyof typeof breakpoints, max: keyof typeof breakpoints) =>
    `@media (min-width: ${breakpoints[min]}px) and (max-width: ${breakpoints[max] - 1}px)`,

  // Only queries (specific breakpoint range)
  only: {
    xs: `@media (min-width: ${breakpoints.xs}px) and (max-width: ${breakpoints.sm - 1}px)`,
    sm: `@media (min-width: ${breakpoints.sm}px) and (max-width: ${breakpoints.md - 1}px)`,
    md: `@media (min-width: ${breakpoints.md}px) and (max-width: ${breakpoints.lg - 1}px)`,
    lg: `@media (min-width: ${breakpoints.lg}px) and (max-width: ${breakpoints.xl - 1}px)`,
    xl: `@media (min-width: ${breakpoints.xl}px) and (max-width: ${breakpoints['2xl'] - 1}px)`,
    '2xl': `@media (min-width: ${breakpoints['2xl']}px)`,
  },
} as const;

// Responsive utilities
export const responsive = {
  // Hide at specific breakpoints
  hide: {
    xs: css`
      ${media.down.xs} {
        display: none;
      }
    `,
    sm: css`
      ${media.down.sm} {
        display: none;
      }
    `,
    md: css`
      ${media.down.md} {
        display: none;
      }
    `,
    lg: css`
      ${media.down.lg} {
        display: none;
      }
    `,
    xl: css`
      ${media.down.xl} {
        display: none;
      }
    `,
    mobile: css`
      ${media.down.md} {
        display: none;
      }
    `,
    desktop: css`
      ${media.up.lg} {
        display: none;
      }
    `,
  },

  // Show at specific breakpoints
  show: {
    xs: css`
      display: none;
      ${media.down.xs} {
        display: block;
      }
    `,
    sm: css`
      display: none;
      ${media.only.sm} {
        display: block;
      }
    `,
    md: css`
      display: none;
      ${media.only.md} {
        display: block;
      }
    `,
    lg: css`
      display: none;
      ${media.only.lg} {
        display: block;
      }
    `,
    xl: css`
      display: none;
      ${media.only.xl} {
        display: block;
      }
    `,
    mobile: css`
      display: none;
      ${media.down.md} {
        display: block;
      }
    `,
    desktop: css`
      display: none;
      ${media.up.lg} {
        display: block;
      }
    `,
  },
};

// Container widths at different breakpoints
export const containerWidths = {
  xs: '100%',
  sm: breakpoints.sm - 40,
  md: breakpoints.md - 48,
  lg: breakpoints.lg - 64,
  xl: breakpoints.xl - 80,
  '2xl': breakpoints.xl, // Max container width
} as const;

// Helper function to create responsive styles
export const createResponsiveStyles = <T extends Record<string, any>>(
  property: string,
  values: Partial<Record<keyof typeof breakpoints, T>>
) => {
  const styles: string[] = [];

  Object.entries(values).forEach(([breakpoint, value]) => {
    if (breakpoint === 'xs') {
      styles.push(`${property}: ${value};`);
    } else {
      styles.push(`
        ${media.up[breakpoint as keyof typeof media.up]} {
          ${property}: ${value};
        }
      `);
    }
  });

  return css`${styles.join('')}`;
};

// Helper function to check if we're at a specific breakpoint
export const useBreakpoint = () => {
  if (typeof window === 'undefined') return 'xs';

  const width = window.innerWidth;

  if (width < breakpoints.sm) return 'xs';
  if (width < breakpoints.md) return 'sm';
  if (width < breakpoints.lg) return 'md';
  if (width < breakpoints.xl) return 'lg';
  if (width < breakpoints['2xl']) return 'xl';
  return '2xl';
};

export type Breakpoint = keyof typeof breakpoints;
export type MediaQueries = typeof media;
/**
 * Design System Tokens
 * Core values that form the foundation of our design system
 */

export const tokens = {
  // Base unit for consistent spacing (4px base)
  baseUnit: 4,

  // Grid system
  grid: {
    columns: 12,
    gutter: 16,
    maxWidth: 1280,
    containerPadding: {
      mobile: 16,
      tablet: 24,
      desktop: 32,
    },
  },

  // Border radius scale
  radii: {
    none: 0,
    xs: 2,
    sm: 4,
    md: 6,
    lg: 8,
    xl: 12,
    '2xl': 16,
    '3xl': 24,
    round: '50%',
    pill: 9999,
  },

  // Border widths
  borders: {
    none: 0,
    thin: 1,
    medium: 2,
    thick: 4,
  },

  // Transition durations (in ms)
  durations: {
    instant: 100,
    fast: 200,
    normal: 300,
    slow: 500,
    slower: 700,
    slowest: 1000,
  },

  // Easing functions
  easings: {
    linear: 'linear',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    easeInBack: 'cubic-bezier(0.6, -0.28, 0.735, 0.045)',
    easeOutBack: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    easeInOutBack: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },

  // Opacity scale
  opacity: {
    0: 0,
    5: 0.05,
    10: 0.1,
    20: 0.2,
    30: 0.3,
    40: 0.4,
    50: 0.5,
    60: 0.6,
    70: 0.7,
    80: 0.8,
    90: 0.9,
    95: 0.95,
    100: 1,
  },

  // Blur values
  blur: {
    none: 0,
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    '2xl': 24,
    '3xl': 40,
  },
} as const;

export type Tokens = typeof tokens;
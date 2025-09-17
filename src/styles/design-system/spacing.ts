/**
 * Spacing System
 * Consistent spacing scale based on 4px unit
 */

import { tokens } from './tokens';

const base = tokens.baseUnit;

// Spacing scale
export const spacing = {
  0: 0,
  px: '1px',
  0.5: base * 0.5,    // 2px
  1: base * 1,        // 4px
  1.5: base * 1.5,    // 6px
  2: base * 2,        // 8px
  2.5: base * 2.5,    // 10px
  3: base * 3,        // 12px
  3.5: base * 3.5,    // 14px
  4: base * 4,        // 16px
  5: base * 5,        // 20px
  6: base * 6,        // 24px
  7: base * 7,        // 28px
  8: base * 8,        // 32px
  9: base * 9,        // 36px
  10: base * 10,      // 40px
  11: base * 11,      // 44px
  12: base * 12,      // 48px
  14: base * 14,      // 56px
  16: base * 16,      // 64px
  20: base * 20,      // 80px
  24: base * 24,      // 96px
  28: base * 28,      // 112px
  32: base * 32,      // 128px
  36: base * 36,      // 144px
  40: base * 40,      // 160px
  44: base * 44,      // 176px
  48: base * 48,      // 192px
  52: base * 52,      // 208px
  56: base * 56,      // 224px
  60: base * 60,      // 240px
  64: base * 64,      // 256px
  72: base * 72,      // 288px
  80: base * 80,      // 320px
  96: base * 96,      // 384px
} as const;

// Named spacing tokens for semantic use
export const namedSpacing = {
  none: spacing[0],
  xs: spacing[1],      // 4px
  sm: spacing[2],      // 8px
  md: spacing[4],      // 16px
  lg: spacing[6],      // 24px
  xl: spacing[8],      // 32px
  '2xl': spacing[12],  // 48px
  '3xl': spacing[16],  // 64px
  '4xl': spacing[24],  // 96px
  '5xl': spacing[32],  // 128px
} as const;

// Layout spacing
export const layoutSpacing = {
  gutter: {
    mobile: spacing[4],     // 16px
    tablet: spacing[6],     // 24px
    desktop: spacing[8],    // 32px
  },
  section: {
    mobile: spacing[8],     // 32px
    tablet: spacing[12],    // 48px
    desktop: spacing[16],   // 64px
  },
  container: {
    mobile: spacing[4],     // 16px
    tablet: spacing[6],     // 24px
    desktop: spacing[8],    // 32px
  },
  stack: {
    xs: spacing[2],         // 8px
    sm: spacing[3],         // 12px
    md: spacing[4],         // 16px
    lg: spacing[6],         // 24px
    xl: spacing[8],         // 32px
  },
  inline: {
    xs: spacing[1],         // 4px
    sm: spacing[2],         // 8px
    md: spacing[3],         // 12px
    lg: spacing[4],         // 16px
    xl: spacing[6],         // 24px
  },
} as const;

// Component spacing
export const componentSpacing = {
  button: {
    paddingX: {
      sm: spacing[3],       // 12px
      md: spacing[4],       // 16px
      lg: spacing[6],       // 24px
    },
    paddingY: {
      sm: spacing[2],       // 8px
      md: spacing[2.5],     // 10px
      lg: spacing[3],       // 12px
    },
    gap: spacing[2],        // 8px
  },
  input: {
    paddingX: spacing[3],   // 12px
    paddingY: spacing[2],   // 8px
    gap: spacing[2],        // 8px
  },
  card: {
    padding: {
      sm: spacing[4],       // 16px
      md: spacing[6],       // 24px
      lg: spacing[8],       // 32px
    },
    gap: spacing[4],        // 16px
  },
  modal: {
    padding: {
      mobile: spacing[4],   // 16px
      tablet: spacing[6],   // 24px
      desktop: spacing[8],  // 32px
    },
    gap: spacing[4],        // 16px
  },
  list: {
    gap: {
      sm: spacing[2],       // 8px
      md: spacing[3],       // 12px
      lg: spacing[4],       // 16px
    },
    itemPadding: spacing[3], // 12px
  },
} as const;

// Helper function to convert spacing to rem
export const toRem = (value: number): string => `${value / 16}rem`;

// Helper function to get spacing value
export const getSpacing = (value: keyof typeof spacing): number => {
  const spacingValue = spacing[value];
  return typeof spacingValue === 'string' ? 1 : spacingValue;
};

// Helper function to create consistent padding
export const padding = {
  all: (value: keyof typeof spacing) => `${spacing[value]}px`,
  x: (value: keyof typeof spacing) => `0 ${spacing[value]}px`,
  y: (value: keyof typeof spacing) => `${spacing[value]}px 0`,
  top: (value: keyof typeof spacing) => `${spacing[value]}px 0 0 0`,
  right: (value: keyof typeof spacing) => `0 ${spacing[value]}px 0 0`,
  bottom: (value: keyof typeof spacing) => `0 0 ${spacing[value]}px 0`,
  left: (value: keyof typeof spacing) => `0 0 0 ${spacing[value]}px`,
};

// Helper function to create consistent margin
export const margin = {
  all: (value: keyof typeof spacing) => `${spacing[value]}px`,
  x: (value: keyof typeof spacing) => `0 ${spacing[value]}px`,
  y: (value: keyof typeof spacing) => `${spacing[value]}px 0`,
  top: (value: keyof typeof spacing) => `${spacing[value]}px 0 0 0`,
  right: (value: keyof typeof spacing) => `0 ${spacing[value]}px 0 0`,
  bottom: (value: keyof typeof spacing) => `0 0 ${spacing[value]}px 0`,
  left: (value: keyof typeof spacing) => `0 0 0 ${spacing[value]}px`,
  auto: 'auto',
  center: '0 auto',
};

export type SpacingScale = typeof spacing;
export type NamedSpacing = typeof namedSpacing;
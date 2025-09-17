/**
 * Theme Configuration
 * Complete theme object combining all design system tokens
 */

import { tokens } from './tokens';
import { lightColors, darkColors, ColorScheme } from './colors';
import { fontFamilies, fontWeights, lineHeights, letterSpacing, typeScale } from './typography';
import { spacing, namedSpacing, layoutSpacing, componentSpacing } from './spacing';
import { breakpoints, breakpointStrings } from './breakpoints';
import { shadows, darkShadows, elevation, focusRings } from './shadows';
import { layers, componentLayers } from './layers';
import { duration, easing, transitions } from './animations';

// Base theme structure
export interface AppTheme {
  // Core tokens
  tokens: typeof tokens;

  // Colors
  colors: ColorScheme;

  // Typography
  typography: {
    fontFamily: typeof fontFamilies;
    fontWeight: typeof fontWeights;
    lineHeight: typeof lineHeights;
    letterSpacing: typeof letterSpacing;
    scale: typeof typeScale;
    fontSize: {
      xs: string;
      sm: string;
      base: string;
      lg: string;
      xl: string;
      '2xl': string;
      '3xl': string;
      '4xl': string;
    };
  };

  // Spacing
  spacing: typeof spacing;
  namedSpacing: typeof namedSpacing;
  layoutSpacing: typeof layoutSpacing;
  componentSpacing: typeof componentSpacing;

  // Layout
  breakpoints: typeof breakpointStrings;
  breakpointValues: typeof breakpoints;

  // Visual
  shadows: typeof shadows | typeof darkShadows;
  elevation: typeof elevation;
  focusRings: typeof focusRings;

  // Borders
  radii: Record<string, string | number>;
  borders: Record<string, string>;

  // Motion
  transitions: typeof transitions;
  duration: typeof duration;
  easing: typeof easing;

  // Z-index
  layers: typeof layers;
  componentLayers: typeof componentLayers;

  // Helpers
  isDark: boolean;
}

// Create light theme
export const lightTheme: AppTheme = {
  tokens,
  colors: lightColors,
  typography: {
    fontFamily: fontFamilies,
    fontWeight: fontWeights,
    lineHeight: lineHeights,
    letterSpacing,
    scale: typeScale,
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
    },
  },
  spacing,
  namedSpacing,
  layoutSpacing,
  componentSpacing,
  breakpoints: breakpointStrings,
  breakpointValues: breakpoints,
  shadows,
  elevation,
  focusRings,
  radii: {
    none: '0',
    xs: `${tokens.radii.xs}px`,
    sm: `${tokens.radii.sm}px`,
    md: `${tokens.radii.md}px`,
    lg: `${tokens.radii.lg}px`,
    xl: `${tokens.radii.xl}px`,
    '2xl': `${tokens.radii['2xl']}px`,
    '3xl': `${tokens.radii['3xl']}px`,
    round: tokens.radii.round,
    pill: `${tokens.radii.pill}px`,
    full: '9999px',
  },
  borders: {
    none: 'none',
    thin: `${tokens.borders.thin}px solid`,
    medium: `${tokens.borders.medium}px solid`,
    thick: `${tokens.borders.thick}px solid`,
  },
  transitions,
  duration,
  easing,
  layers,
  componentLayers,
  isDark: false,
};

// Create dark theme
export const darkTheme: AppTheme = {
  ...lightTheme,
  colors: darkColors,
  shadows: darkShadows,
  isDark: true,
};

// Theme provider helper
export const getTheme = (isDark: boolean = false): AppTheme => {
  return isDark ? darkTheme : lightTheme;
};

// CSS variables for runtime theming
export const createCSSVariables = (theme: AppTheme) => {
  const variables: Record<string, string> = {};

  // Colors
  Object.entries(theme.colors).forEach(([category, values]) => {
    if (typeof values === 'object') {
      Object.entries(values).forEach(([key, value]) => {
        variables[`--color-${category}-${key}`] = value as string;
      });
    } else {
      variables[`--color-${category}`] = values as string;
    }
  });

  // Spacing
  Object.entries(theme.spacing).forEach(([key, value]) => {
    variables[`--spacing-${key}`] = `${value}px`;
  });

  // Typography
  Object.entries(theme.typography.fontSize).forEach(([key, value]) => {
    variables[`--font-size-${key}`] = value;
  });

  // Shadows
  Object.entries(theme.shadows).forEach(([key, value]) => {
    variables[`--shadow-${key}`] = value;
  });

  // Radii
  Object.entries(theme.radii).forEach(([key, value]) => {
    variables[`--radius-${key}`] = value.toString();
  });

  return variables;
};


// Default export
export default lightTheme;
/**
 * Theme Compatibility Layer
 * Extends the design system theme with legacy values for backward compatibility
 * This provides a clean migration path from the old theme structure
 */

import { lightTheme as designSystemTheme, darkTheme as designSystemDarkTheme, AppTheme } from './theme';
import { ColorScheme } from './colors';

// Create properly structured light theme colors
const createLightColors = (): any => ({
  ...designSystemTheme.colors,

  // Keep nested structure from design system
  action: designSystemTheme.colors.action,
  status: designSystemTheme.colors.status,
  interactive: designSystemTheme.colors.interactive,
  brand: designSystemTheme.colors.brand,

  // Header-specific overrides with proper structure
  background: {
    ...designSystemTheme.colors.background,
    primary: 'rgba(255, 255, 255, 0.8)', // Semi-transparent for glassmorphism effect
  },
  surface: {
    ...designSystemTheme.colors.surface,
    elevated: 'rgba(255, 255, 255, 0.95)', // Slightly more opaque when scrolled
  },
  border: {
    ...designSystemTheme.colors.border,
    default: '#e0e0e0', // Light grey border
  },

  // Legacy flat properties for backward compatibility
  primary: 'hsl(130, 47%, 42%)',
  primaryDark: 'hsl(152, 100%, 21%)',
  secondary: '#1775B0',
  text: 'hsl(220, 38%, 11%)',
  textSecondary: 'hsl(223, 18%, 31%)',
  textMuted: 'hsl(0, 0%, 45%)',
  error: '#ffcccc',
  errorBright: '#d32f2f',
  success: '#c8dcc0',
  warning: '#f59e0b',
  info: '#3b82f6',
  white: '#ffffff',
  black: '#000000',
  green5: 'hsl(132, 16%, 94%)',
  menu: 'rgba(255, 255, 255, 0.9)',
  transparent: '#c8dcc0',
  transparent1: 'rgba(255, 255, 255, 0.6)',
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },
});

// Extend the design system theme with original values
export const lightTheme: any = {
  ...designSystemTheme,

  colors: createLightColors(),

  // Add breakpoints for backwards compatibility
  breakpoints: {
    xs: '475px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },

  // Extended spacing with legacy string values
  spacing: {
    ...designSystemTheme.spacing,
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '3rem',
  },

  // Extended typography with legacy properties
  typography: {
    ...designSystemTheme.typography,
    fontFamily: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif',
    fontFamilyHeading: 'var(--font-pacaembu), ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif',
    // Add original font sizes for backward compatibility
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '2.5rem',  // Larger for H1 on home page
      '3xl': '3rem',    // Larger for H1 on home page
      '4xl': '3.5rem',  // Larger for H1 on home page
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeight: {
      normal: 1.5,
      tight: 1.25,
      relaxed: 1.625,
    },
  },

  // Custom shadows for legacy support
  shadows: {
    ...designSystemTheme.shadows,
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0px 0px 25px 10px #e8ebef',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  },

  // Original radii values in pixels
  radii: {
    sm: '2px',    // 0.125rem
    md: '6px',    // 0.375rem
    lg: '8px',    // 0.5rem
    xl: '12px',
    '2xl': '16px',
    '3xl': '20px',
    full: '9999px',
    round: '50%',
    pill: '9999px',
    none: '0',
    xs: '2px',
  },

  // Extended transitions
  transitions: {
    ...designSystemTheme.transitions,
    fast: '150ms ease-in-out',
    normal: '300ms ease-in-out',
    slow: '500ms ease-in-out',
  },

  // Z-index hierarchy
  zIndices: {
    hide: -1,
    base: 0,
    dropdown: 1000,
    sticky: 1100,
    banner: 1200,
    overlay: 1300,
    modal: 1400,
    popover: 1500,
    toast: 1600,
    tooltip: 1700,
  },

  // Layer system
  layers: {
    base: 0,
    raised: 10,
    overlay: 20,
    elevated: 30,
    sticky: 40,
    modal: 50,
    popover: 60,
    dropdown: 70,
    toast: 80,
    tooltip: 90,
    max: 999,
    content: 5,
  },
};

// Create properly structured dark theme colors
const createDarkColors = (): any => ({
  ...designSystemDarkTheme.colors,

  // Keep nested structure from design system
  action: designSystemDarkTheme.colors.action,
  status: designSystemDarkTheme.colors.status,
  interactive: designSystemDarkTheme.colors.interactive,
  brand: designSystemDarkTheme.colors.brand,

  // Header-specific overrides with proper structure
  background: {
    ...designSystemDarkTheme.colors.background,
    primary: 'rgba(35, 37, 42, 0.8)', // Semi-transparent dark for header
  },
  surface: {
    ...designSystemDarkTheme.colors.surface,
    elevated: 'rgba(35, 37, 42, 0.95)', // Slightly more opaque when scrolled
  },
  border: {
    ...designSystemDarkTheme.colors.border,
    default: 'rgba(255, 255, 255, 0.1)', // Subtle border for dark mode
  },

  // Legacy flat properties for backward compatibility
  primary: 'hsl(130, 41%, 51%)',
  primaryDark: 'hsl(152, 100%, 11%)',
  secondary: '#3b93d6',
  text: 'hsl(0, 0%, 100%)',
  textSecondary: 'hsl(0, 0%, 80%)',
  textMuted: 'hsl(0, 0%, 60%)',
  error: '#ff6b6b',
  errorBright: '#ff4444',
  success: '#8fcf7f',
  warning: '#ffc947',
  info: '#64b5f6',
  white: '#ffffff',
  black: '#000000',
  green5: 'hsl(132, 16%, 15%)',
  menu: 'rgba(35, 37, 42, 0.9)',
  transparent: '#3a4a3a',
  transparent1: 'rgba(35, 37, 42, 0.6)',
  gray: {
    50: '#111111',
    100: '#1a1a1a',
    200: '#2a2a2a',
    300: '#3a3a3a',
    400: '#4a4a4a',
    500: '#6a6a6a',
    600: '#8a8a8a',
    700: '#aaaaaa',
    800: '#cacaca',
    900: '#eaeaea',
  },
});

// Dark theme with original dark values
export const darkTheme: any = {
  ...designSystemDarkTheme,

  colors: createDarkColors(),

  breakpoints: lightTheme.breakpoints,

  // Same structure overrides as light theme
  spacing: lightTheme.spacing,
  typography: lightTheme.typography,
  layers: lightTheme.layers,
  shadows: {
    ...designSystemDarkTheme.shadows,
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.2)',
    md: '0px 0px 25px 10px rgba(0, 0, 0, 0.2)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.3)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.3)',
  },
  radii: lightTheme.radii,
  transitions: lightTheme.transitions,
  zIndices: lightTheme.zIndices,
};

// Export type for use in other files
export type ThemeColors = ReturnType<typeof createLightColors>;

// Export as default
export default lightTheme;
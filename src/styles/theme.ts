import { Theme } from '@emotion/react';

// CSS custom property references — these resolve at paint time
// based on data-theme attribute set by next-themes before hydration.
export const theme: Theme = {
  colors: {
    primary: 'var(--color-primary)',
    primaryDark: 'var(--color-primaryDark)',
    secondary: 'var(--color-secondary)',
    background: 'var(--color-background)',
    surface: 'var(--color-surface)',
    text: 'var(--color-text)',
    textSecondary: 'var(--color-textSecondary)',
    textMuted: 'var(--color-textMuted)',
    border: 'var(--color-border)',
    error: 'var(--color-error)',
    errorBright: 'var(--color-errorBright)',
    success: 'var(--color-success)',
    warning: 'var(--color-warning)',
    info: 'var(--color-info)',
    white: '#ffffff',
    black: '#000000',
    green5: 'var(--color-green5)',
    menu: 'var(--color-menu)',
    transparent: 'var(--color-transparent)',
    transparent1: 'var(--color-transparent1)',
    gray: {
      50: 'var(--color-gray-50)',
      100: 'var(--color-gray-100)',
      200: 'var(--color-gray-200)',
      300: 'var(--color-gray-300)',
      400: 'var(--color-gray-400)',
      500: 'var(--color-gray-500)',
      600: 'var(--color-gray-600)',
      700: 'var(--color-gray-700)',
      800: 'var(--color-gray-800)',
      900: 'var(--color-gray-900)',
    },
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '3rem',
  },
  breakpoints: {
    xs: '480px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  },
  typography: {
    fontFamily: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
    fontFamilyHeading: 'var(--font-pacaembu), ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif',
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.7rem',
      '4xl': '2.5rem',
    },
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeight: {
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.75,
    },
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: 'var(--shadow-md)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  },
  radii: {
    sm: '0.125rem',
    md: '0.375rem',
    lg: '0.5rem',
    full: '9999px',
    pill: '9999px',
  },
  transitions: {
    fast: '150ms ease-in-out',
    normal: '300ms ease-in-out',
    slow: '500ms ease-in-out',
    all: {
      fast: '150ms ease-in-out',
      normal: '300ms ease-in-out',
      slow: '500ms ease-in-out',
    },
  },
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
};

// Keep exports for backward compatibility in case anything imports these
export const lightTheme = theme;
export const darkTheme = theme;

// Raw color values for the CSS custom properties (used in layout.tsx)
export const themeColors = {
  light: {
    primary: 'hsl(130, 47%, 42%)',
    primaryDark: 'hsl(152, 100%, 21%)',
    secondary: '#1775B0',
    background: '#ffffff',
    surface: '#ffffff',
    text: 'hsl(220, 38%, 11%)',
    textSecondary: 'hsl(223, 18%, 31%)',
    textMuted: 'hsl(0, 0%, 45%)',
    border: '#e0e0e0',
    error: '#ffcccc',
    errorBright: '#d32f2f',
    success: '#c8dcc0',
    warning: '#f59e0b',
    info: '#3b82f6',
    green5: 'hsl(132, 16%, 94%)',
    menu: 'rgba(255, 255, 255, 0.9)',
    transparent: '#c8dcc0',
    transparent1: 'rgba(255, 255, 255, 0.6)',
    'gray-50': '#f9fafb',
    'gray-100': '#f3f4f6',
    'gray-200': '#e5e7eb',
    'gray-300': '#d1d5db',
    'gray-400': '#9ca3af',
    'gray-500': '#6b7280',
    'gray-600': '#4b5563',
    'gray-700': '#374151',
    'gray-800': '#1f2937',
    'gray-900': '#111827',
    'shadow-md': '0px 0px 25px 10px #e8ebef',
  },
  dark: {
    primary: 'hsl(130, 47%, 42%)',
    primaryDark: 'hsl(130, 47%, 35%)',
    secondary: '#1775B0',
    background: '#23252a',
    surface: '#252e3d',
    text: 'hsl(0, 0%, 100%)',
    textSecondary: 'hsl(0, 0%, 100%)',
    textMuted: 'hsl(0, 0%, 55%)',
    border: '#2a313d',
    error: '#5c1616',
    errorBright: '#e85656',
    success: 'hsl(152, 100%, 21%)',
    warning: '#f59e0b',
    info: '#3b82f6',
    green5: 'hsl(152, 100%, 11%)',
    menu: 'rgba(26, 26, 26, 0.9)',
    transparent: '#3f453f',
    transparent1: 'rgba(255, 255, 255, 0.05)',
    'gray-50': '#1a1d23',
    'gray-100': '#1f2937',
    'gray-200': '#2a313d',
    'gray-300': '#374151',
    'gray-400': '#4b5563',
    'gray-500': '#6b7280',
    'gray-600': '#9ca3af',
    'gray-700': '#d1d5db',
    'gray-800': '#e5e7eb',
    'gray-900': '#f3f4f6',
    'shadow-md': '0px 0px 25px 10px rgba(0, 0, 0, 0.2)',
  },
} as const;

// Generate CSS custom properties string for embedding in <style>
export function generateThemeCSS(): string {
  const lightVars = Object.entries(themeColors.light)
    .map(([key, value]) => `--color-${key}: ${value};`)
    .join('\n    ');
  const darkVars = Object.entries(themeColors.dark)
    .map(([key, value]) => `--color-${key}: ${value};`)
    .join('\n    ');

  // Strip --color- prefix from shadow variable (--color-shadow-md -> --shadow-md)
  return `
    :root, [data-theme="light"] {
    ${lightVars.replace(/--color-shadow-md/g, '--shadow-md')}
    }
    [data-theme="dark"] {
    ${darkVars.replace(/--color-shadow-md/g, '--shadow-md')}
    }
    @media (prefers-color-scheme: dark) {
      :root:not([data-theme="light"]) {
      ${darkVars.replace(/--color-shadow-md/g, '--shadow-md')}
      }
    }
  `;
}

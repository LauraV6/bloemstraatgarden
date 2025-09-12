import { Theme } from '@emotion/react';

export const lightTheme: Theme = {
  colors: {
    primary: 'hsl(130, 47%, 42%)', // --color-green-2
    primaryDark: 'hsl(152, 100%, 21%)', // --color-green-1
    secondary: '#1775B0', // --color-blue: hsl(204, 68%, 42%)
    background: '#ffffff', // --color-2: hsl(0, 0%, 100%)
    surface: '#ffffff', // --color-1: hsl(0, 0%, 100%)
    text: 'hsl(220, 38%, 11%)', // --color-font: hsl(220, 38%, 11%)
    textSecondary: 'hsl(223, 18%, 31%)', // --color-font-light: hsl(223, 18%, 31%)
    textMuted: 'hsl(0, 0%, 45%)', // --color-text-muted: hsl(0, 0%, 45%)
    border: '#e0e0e0', // --color-3: hsl(0, 0%, 88%)
    error: '#ffcccc', // --color-error: hsl(0, 100%, 90%)
    errorBright: '#d32f2f', // --color-error-bright: hsl(0, 91%, 40%)
    success: '#c8dcc0', // --color-correct: hsl(128, 22%, 85%)
    warning: '#f59e0b',
    info: '#3b82f6',
    white: '#ffffff',
    black: '#000000',
    green5: 'hsl(132, 16%, 94%)', // --color-green-5
    menu: 'rgba(255, 255, 255, 0.9)', // --color-menu: hsla(0, 0%, 100%, .9)
    transparent: '#c8dcc0', // --color-transparent: hsl(128, 22%, 85%)
    transparent1: 'rgba(255, 255, 255, 0.6)', // --color-transparent-1: hsla(0, 0%, 100%, .6)
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
      '3xl': '1.875rem',
      '4xl': '2.25rem',
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
    md: '0px 0px 25px 10px #e8ebef', // --box-shadow for light mode
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  },
  radii: {
    sm: '0.125rem',
    md: '0.375rem',
    lg: '0.5rem',
    full: '9999px',
  },
  transitions: {
    fast: '150ms ease-in-out',
    normal: '300ms ease-in-out',
    slow: '500ms ease-in-out',
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

export const darkTheme: Theme = {
  ...lightTheme,
  colors: {
    ...lightTheme.colors,
    primary: 'hsl(130, 47%, 42%)', // --color-4 in dark
    primaryDark: 'hsl(130, 47%, 35%)', // --color-primary-dark in dark
    secondary: '#1775B0',
    background: '#23252a', // --color-2 in dark: correct dark background
    surface: '#252e3d', // --color-1 in dark: hsl(220, 16%, 18%)
    text: 'hsl(0, 0%, 100%)', // --color-font in dark: hsl(0, 0%, 100%)
    textSecondary: 'hsl(0, 0%, 100%)', // --color-font-light in dark: hsl(0, 0%, 100%)
    textMuted: 'hsl(0, 0%, 55%)', // --color-text-muted in dark: hsl(0, 0%, 55%)
    border: '#2a313d', // --color-3 in dark: hsl(225, 9%, 18%)
    error: '#5c1616', // --color-error in dark: hsl(0, 74%, 27%)
    errorBright: '#e85656', // --color-error-bright in dark: hsl(0, 78%, 56%)
    success: 'hsl(152, 100%, 21%)', // --color-correct in dark
    green5: 'hsl(152, 100%, 11%)', // --color-green-5 in dark
    menu: 'rgba(26, 26, 26, 0.9)', // --color-menu in dark: hsla(0, 0%, 10%, .9)
    transparent: '#3f453f', // --color-transparent in dark: hsl(132, 4%, 26%)
    transparent1: 'rgba(255, 255, 255, 0.05)', // --color-transparent-1 in dark: hsla(0, 0%, 100%, .05)
  },
  shadows: {
    ...lightTheme.shadows,
    md: '0px 0px 25px 10px rgba(0, 0, 0, 0.2)', // --box-shadow for dark mode
  },
};
/**
 * Semantic Color System
 * All colors are defined with semantic meaning for better maintainability
 */

// Base color palette
const palette = {
  // Green shades (Primary brand colors)
  green: {
    50: 'hsl(132, 16%, 94%)',
    100: 'hsl(130, 18%, 88%)',
    200: 'hsl(128, 22%, 75%)',
    300: 'hsl(130, 30%, 60%)',
    400: 'hsl(130, 41%, 51%)',
    500: 'hsl(130, 47%, 42%)',
    600: 'hsl(130, 52%, 35%)',
    700: 'hsl(152, 60%, 28%)',
    800: 'hsl(152, 100%, 21%)',
    900: 'hsl(152, 100%, 11%)',
  },

  // Blue shades (Secondary)
  blue: {
    50: 'hsl(204, 100%, 97%)',
    100: 'hsl(204, 93%, 93%)',
    200: 'hsl(204, 88%, 86%)',
    300: 'hsl(204, 82%, 74%)',
    400: 'hsl(204, 76%, 59%)',
    500: 'hsl(204, 68%, 42%)',
    600: 'hsl(204, 70%, 35%)',
    700: 'hsl(204, 74%, 28%)',
    800: 'hsl(204, 78%, 22%)',
    900: 'hsl(204, 82%, 17%)',
  },

  // Neutral grays
  gray: {
    50: 'hsl(0, 0%, 98%)',
    100: 'hsl(0, 0%, 96%)',
    200: 'hsl(0, 0%, 90%)',
    300: 'hsl(0, 0%, 82%)',
    400: 'hsl(0, 0%, 64%)',
    500: 'hsl(0, 0%, 45%)',
    600: 'hsl(0, 0%, 32%)',
    700: 'hsl(0, 0%, 25%)',
    800: 'hsl(0, 0%, 15%)',
    900: 'hsl(0, 0%, 9%)',
    950: 'hsl(0, 0%, 4%)',
  },

  // Status colors
  red: {
    50: 'hsl(0, 100%, 97%)',
    100: 'hsl(0, 100%, 94%)',
    200: 'hsl(0, 100%, 90%)',
    300: 'hsl(0, 90%, 80%)',
    400: 'hsl(0, 84%, 67%)',
    500: 'hsl(0, 72%, 51%)',
    600: 'hsl(0, 74%, 42%)',
    700: 'hsl(0, 76%, 35%)',
    800: 'hsl(0, 78%, 28%)',
    900: 'hsl(0, 80%, 22%)',
  },

  yellow: {
    50: 'hsl(48, 100%, 96%)',
    100: 'hsl(48, 96%, 89%)',
    200: 'hsl(48, 97%, 77%)',
    300: 'hsl(46, 97%, 65%)',
    400: 'hsl(43, 96%, 56%)',
    500: 'hsl(38, 92%, 50%)',
    600: 'hsl(32, 95%, 44%)',
    700: 'hsl(26, 90%, 37%)',
    800: 'hsl(23, 83%, 31%)',
    900: 'hsl(22, 78%, 26%)',
  },

  // Constants
  white: '#ffffff',
  black: '#000000',
  transparent: 'transparent',
} as const;

// Color scheme type
export type ColorScheme = {
  action: {
    primary: string;
    primaryHover: string;
    primaryActive: string;
    primaryDisabled: string;
    secondary: string;
    secondaryHover: string;
    secondaryActive: string;
    secondaryDisabled: string;
    danger: string;
    dangerHover: string;
    dangerActive: string;
    dangerDisabled: string;
  };
  background: {
    primary: string;
    secondary: string;
    tertiary: string;
    inverse: string;
    overlay: string;
    overlayDark: string;
    overlayLight: string;
  };
  surface: {
    primary: string;
    secondary: string;
    tertiary: string;
    elevated: string;
    sunken: string;
    inverse: string;
    disabled?: string;
  };
  border: {
    default: string;
    light: string;
    dark: string;
    focused: string;
    error: string;
    success: string;
    warning: string;
  };
  text: {
    primary: string;
    secondary: string;
    tertiary: string;
    disabled: string;
    inverse: string;
    link: string;
    linkHover: string;
    error: string;
    success: string;
    warning: string;
    muted?: string;
  };
  status: {
    success: string;
    successBackground: string;
    successBorder: string;
    warning: string;
    warningBackground: string;
    warningBorder: string;
    error: string;
    errorBackground: string;
    errorBorder: string;
    info: string;
    infoBackground: string;
    infoBorder: string;
  };
  interactive: {
    hover: string;
    active: string;
    selected: string;
    selectedBorder: string;
    focusRing: string;
  };
  brand: {
    primary: string;
    primaryDark: string;
    primaryLight: string;
    secondary: string;
    accent: string;
  };
  white: string;
  black: string;
};

// Semantic color mappings for light theme
export const lightColors: ColorScheme = {
  // Actions
  action: {
    primary: palette.green[500],
    primaryHover: palette.green[600],
    primaryActive: palette.green[700],
    primaryDisabled: palette.green[200],

    secondary: palette.blue[500],
    secondaryHover: palette.blue[600],
    secondaryActive: palette.blue[700],
    secondaryDisabled: palette.blue[200],

    danger: palette.red[500],
    dangerHover: palette.red[600],
    dangerActive: palette.red[700],
    dangerDisabled: palette.red[200],
  },

  // Backgrounds
  background: {
    primary: palette.white,
    secondary: palette.gray[50],
    tertiary: palette.gray[100],
    inverse: palette.gray[900],
    overlay: 'rgba(0, 0, 0, 0.5)',
    overlayDark: 'rgba(0, 0, 0, 0.7)',
    overlayLight: 'rgba(0, 0, 0, 0.3)',
  },

  // Surfaces
  surface: {
    primary: palette.white,
    secondary: palette.gray[50],
    tertiary: palette.gray[100],
    elevated: palette.white,
    sunken: palette.gray[50],
    inverse: palette.gray[900],
    disabled: palette.gray[100],
  },

  // Borders
  border: {
    default: palette.gray[200],
    light: palette.gray[100],
    dark: palette.gray[300],
    focused: palette.green[500],
    error: palette.red[500],
    success: palette.green[500],
    warning: palette.yellow[500],
  },

  // Text colors
  text: {
    primary: palette.gray[900],
    secondary: palette.gray[700],
    tertiary: palette.gray[500],
    disabled: palette.gray[400],
    inverse: palette.white,
    link: palette.blue[600],
    linkHover: palette.blue[700],
    error: palette.red[600],
    success: palette.green[700],
    warning: palette.yellow[700],
    muted: palette.gray[600],
  },

  // Status
  status: {
    success: palette.green[500],
    successBackground: palette.green[50],
    successBorder: palette.green[200],

    warning: palette.yellow[500],
    warningBackground: palette.yellow[50],
    warningBorder: palette.yellow[200],

    error: palette.red[500],
    errorBackground: palette.red[50],
    errorBorder: palette.red[200],

    info: palette.blue[500],
    infoBackground: palette.blue[50],
    infoBorder: palette.blue[200],
  },

  // Interactive states
  interactive: {
    hover: palette.gray[50],
    active: palette.gray[100],
    selected: palette.green[50],
    selectedBorder: palette.green[500],
    focusRing: 'rgba(74, 222, 128, 0.3)',
  },

  // Constants
  white: palette.white,
  black: palette.black,

  // Brand specific
  brand: {
    primary: palette.green[500],
    primaryDark: palette.green[800],
    primaryLight: palette.green[50],
    secondary: palette.blue[500],
    accent: palette.green[400],
  },
};

// Dark theme variations
export const darkColors: ColorScheme = {
  // Actions
  action: {
    primary: palette.green[400],
    primaryHover: palette.green[300],
    primaryActive: palette.green[500],
    primaryDisabled: palette.green[800],

    secondary: palette.blue[400],
    secondaryHover: palette.blue[300],
    secondaryActive: palette.blue[500],
    secondaryDisabled: palette.blue[800],

    danger: palette.red[400],
    dangerHover: palette.red[300],
    dangerActive: palette.red[500],
    dangerDisabled: palette.red[800],
  },

  // Backgrounds
  background: {
    primary: '#1a1a1a',
    secondary: '#232323',
    tertiary: '#2a2a2a',
    inverse: palette.white,
    overlay: 'rgba(0, 0, 0, 0.7)',
    overlayDark: 'rgba(0, 0, 0, 0.85)',
    overlayLight: 'rgba(0, 0, 0, 0.5)',
  },

  // Surfaces
  surface: {
    primary: '#252525',
    secondary: '#2a2a2a',
    tertiary: '#333333',
    elevated: '#2d2d2d',
    sunken: '#1a1a1a',
    inverse: palette.white,
    disabled: '#404040',
  },

  // Borders
  border: {
    default: 'rgba(255, 255, 255, 0.1)',
    light: 'rgba(255, 255, 255, 0.05)',
    dark: 'rgba(255, 255, 255, 0.2)',
    focused: palette.green[400],
    error: palette.red[400],
    success: palette.green[400],
    warning: palette.yellow[400],
  },

  // Text colors
  text: {
    primary: palette.gray[50],
    secondary: palette.gray[200],
    tertiary: palette.gray[400],
    disabled: palette.gray[600],
    inverse: palette.gray[900],
    link: palette.blue[400],
    linkHover: palette.blue[300],
    error: palette.red[400],
    success: palette.green[400],
    warning: palette.yellow[400],
    muted: palette.gray[300],
  },

  // Status
  status: {
    success: palette.green[400],
    successBackground: 'rgba(74, 222, 128, 0.1)',
    successBorder: 'rgba(74, 222, 128, 0.3)',

    warning: palette.yellow[400],
    warningBackground: 'rgba(251, 191, 36, 0.1)',
    warningBorder: 'rgba(251, 191, 36, 0.3)',

    error: palette.red[400],
    errorBackground: 'rgba(248, 113, 113, 0.1)',
    errorBorder: 'rgba(248, 113, 113, 0.3)',

    info: palette.blue[400],
    infoBackground: 'rgba(96, 165, 250, 0.1)',
    infoBorder: 'rgba(96, 165, 250, 0.3)',
  },

  // Interactive states
  interactive: {
    hover: 'rgba(255, 255, 255, 0.05)',
    active: 'rgba(255, 255, 255, 0.1)',
    selected: 'rgba(74, 222, 128, 0.1)',
    selectedBorder: 'rgba(74, 222, 128, 0.5)',
    focusRing: 'rgba(74, 222, 128, 0.4)',
  },

  // Constants
  white: palette.white,
  black: palette.black,

  // Brand specific
  brand: {
    primary: palette.green[400],
    primaryDark: palette.green[700],
    primaryLight: palette.green[100],
    secondary: palette.blue[400],
    accent: palette.green[300],
  },
};
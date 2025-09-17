/**
 * Shadow System
 * Consistent elevation and shadow patterns
 */

// Shadow values
export const shadows = {
  none: 'none',
  xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)',
} as const;

// Colored shadows
export const coloredShadows = {
  primary: {
    sm: '0 1px 3px 0 rgba(74, 222, 128, 0.2), 0 1px 2px -1px rgba(74, 222, 128, 0.2)',
    md: '0 4px 6px -1px rgba(74, 222, 128, 0.2), 0 2px 4px -2px rgba(74, 222, 128, 0.2)',
    lg: '0 10px 15px -3px rgba(74, 222, 128, 0.2), 0 4px 6px -4px rgba(74, 222, 128, 0.2)',
  },
  error: {
    sm: '0 1px 3px 0 rgba(239, 68, 68, 0.2), 0 1px 2px -1px rgba(239, 68, 68, 0.2)',
    md: '0 4px 6px -1px rgba(239, 68, 68, 0.2), 0 2px 4px -2px rgba(239, 68, 68, 0.2)',
    lg: '0 10px 15px -3px rgba(239, 68, 68, 0.2), 0 4px 6px -4px rgba(239, 68, 68, 0.2)',
  },
  warning: {
    sm: '0 1px 3px 0 rgba(245, 158, 11, 0.2), 0 1px 2px -1px rgba(245, 158, 11, 0.2)',
    md: '0 4px 6px -1px rgba(245, 158, 11, 0.2), 0 2px 4px -2px rgba(245, 158, 11, 0.2)',
    lg: '0 10px 15px -3px rgba(245, 158, 11, 0.2), 0 4px 6px -4px rgba(245, 158, 11, 0.2)',
  },
} as const;

// Elevation system (Material Design inspired)
export const elevation = {
  0: 'none',
  1: shadows.xs,
  2: shadows.sm,
  4: shadows.md,
  6: '0 6px 10px -1px rgba(0, 0, 0, 0.1), 0 3px 5px -2px rgba(0, 0, 0, 0.1)',
  8: shadows.lg,
  12: '0 12px 20px -3px rgba(0, 0, 0, 0.1), 0 5px 8px -4px rgba(0, 0, 0, 0.1)',
  16: shadows.xl,
  24: shadows['2xl'],
} as const;

// Focus ring shadows
export const focusRings = {
  default: '0 0 0 3px rgba(74, 222, 128, 0.3)',
  primary: '0 0 0 3px rgba(74, 222, 128, 0.3)',
  error: '0 0 0 3px rgba(239, 68, 68, 0.3)',
  warning: '0 0 0 3px rgba(245, 158, 11, 0.3)',
  info: '0 0 0 3px rgba(59, 130, 246, 0.3)',
  subtle: '0 0 0 2px rgba(0, 0, 0, 0.1)',
  strong: '0 0 0 4px rgba(74, 222, 128, 0.5)',
} as const;

// Shadow transitions
export const shadowTransitions = {
  hover: 'box-shadow 200ms cubic-bezier(0.4, 0, 0.2, 1)',
  focus: 'box-shadow 150ms cubic-bezier(0.4, 0, 0.2, 1)',
  active: 'box-shadow 100ms cubic-bezier(0.4, 0, 0.2, 1)',
} as const;

// Helper function to create custom shadow
export const createShadow = (
  x: number,
  y: number,
  blur: number,
  spread: number,
  color: string,
  opacity: number = 0.1
) => `${x}px ${y}px ${blur}px ${spread}px rgba(${color}, ${opacity})`;

// Helper function to create multiple shadows
export const combineShadows = (...shadows: string[]) => shadows.join(', ');

// Dark mode shadow adjustments
export const darkShadows = {
  none: 'none',
  xs: '0 1px 2px 0 rgba(0, 0, 0, 0.2)',
  sm: '0 1px 3px 0 rgba(0, 0, 0, 0.3), 0 1px 2px -1px rgba(0, 0, 0, 0.3)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -2px rgba(0, 0, 0, 0.3)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -4px rgba(0, 0, 0, 0.3)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 8px 10px -6px rgba(0, 0, 0, 0.3)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.15)',
} as const;

export type Shadow = typeof shadows;
export type Elevation = typeof elevation;
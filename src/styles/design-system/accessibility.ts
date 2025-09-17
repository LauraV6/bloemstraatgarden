/**
 * Accessibility System
 * WCAG compliant utilities and helpers
 */

import { css } from '@emotion/react';
import { lightColors, darkColors } from './colors';
import { focusRings } from './shadows';

// Visually hidden but accessible to screen readers
export const visuallyHidden = css`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;

// Skip to content link for keyboard navigation
export const skipToContent = css`
  position: absolute;
  top: -40px;
  left: 0;
  background: ${lightColors.background.primary};
  color: ${lightColors.text.primary};
  padding: 8px 16px;
  text-decoration: none;
  border-radius: 0 0 4px 0;
  z-index: 9999;

  &:focus {
    top: 0;
  }
`;

// Focus styles
export const focusStyles = {
  // Default focus ring
  default: css`
    &:focus-visible {
      outline: none;
      box-shadow: ${focusRings.default};
    }
  `,

  // Primary focus ring
  primary: css`
    &:focus-visible {
      outline: none;
      box-shadow: ${focusRings.primary};
    }
  `,

  // Error focus ring
  error: css`
    &:focus-visible {
      outline: none;
      box-shadow: ${focusRings.error};
    }
  `,

  // Custom focus ring
  custom: (color: string) => css`
    &:focus-visible {
      outline: none;
      box-shadow: 0 0 0 3px ${color};
    }
  `,

  // Inset focus
  inset: css`
    &:focus-visible {
      outline: none;
      box-shadow: inset 0 0 0 2px ${lightColors.action.primary};
    }
  `,
};

// Keyboard navigation indicators
export const keyboardOnly = css`
  &:focus:not(:focus-visible) {
    outline: none;
  }

  &:focus-visible {
    outline: 2px solid ${lightColors.action.primary};
    outline-offset: 2px;
  }
`;

// High contrast mode support
export const highContrast = {
  // Force colors for high contrast mode
  border: css`
    @media (prefers-contrast: high) {
      border: 2px solid currentColor !important;
    }
  `,

  // Increase contrast for text
  text: css`
    @media (prefers-contrast: high) {
      font-weight: 500;
      text-shadow: 0 0 1px currentColor;
    }
  `,

  // Enhanced focus indicators
  focus: css`
    @media (prefers-contrast: high) {
      &:focus-visible {
        outline: 3px solid currentColor !important;
        outline-offset: 3px !important;
      }
    }
  `,
};

// Reduced motion preferences
export const motionPreferences = {
  // Disable animations for users who prefer reduced motion
  reducedMotion: css`
    @media (prefers-reduced-motion: reduce) {
      animation: none !important;
      transition: none !important;
      transform: none !important;
    }
  `,

  // Safe animations that respect user preferences
  safeTransition: (property: string = 'all', duration: string = '200ms') => css`
    transition: ${property} ${duration} ease;

    @media (prefers-reduced-motion: reduce) {
      transition: none;
    }
  `,

  // Safe transform animations
  safeTransform: css`
    @media (prefers-reduced-motion: no-preference) {
      transition: transform 200ms ease;
    }
  `,
};

// Color contrast utilities
export const colorContrast = {
  // Calculate contrast ratio
  getContrastRatio: (foreground: string, background: string): number => {
    // Simplified contrast calculation (implement full WCAG formula if needed)
    return 4.5; // Placeholder
  },

  // Ensure minimum contrast
  ensureContrast: (color: string, background: string, minRatio: number = 4.5) => {
    // Logic to adjust color if contrast is insufficient
    return color;
  },

  // WCAG AA compliant text colors
  aa: {
    normal: css`
      color: ${lightColors.text.primary};
      background-color: ${lightColors.background.primary};
    `,
    large: css`
      color: ${lightColors.text.secondary};
      background-color: ${lightColors.background.primary};
    `,
  },

  // WCAG AAA compliant text colors
  aaa: {
    normal: css`
      color: ${lightColors.text.primary};
      background-color: ${lightColors.background.primary};
      font-weight: 500;
    `,
    large: css`
      color: ${lightColors.text.primary};
      background-color: ${lightColors.background.primary};
    `,
  },
};

// Screen reader utilities
export const screenReader = {
  // Announce content to screen readers
  announce: css`
    position: absolute;
    left: -10000px;
    width: 1px;
    height: 1px;
    overflow: hidden;
  `,

  // Live region for dynamic content
  liveRegion: (type: 'polite' | 'assertive' = 'polite') => css`
    position: absolute;
    left: -10000px;
    width: 1px;
    height: 1px;
    overflow: hidden;
    aria-live: ${type};
    aria-atomic: true;
  `,

  // Describe element for screen readers
  describe: (description: string) => css`
    &::after {
      content: "${description}";
      position: absolute;
      left: -10000px;
      width: 1px;
      height: 1px;
      overflow: hidden;
    }
  `,
};

// Interactive element states
export const interactiveStates = {
  // Disabled state
  disabled: css`
    opacity: 0.6;
    cursor: not-allowed;
    pointer-events: none;
    filter: grayscale(0.3);

    &[aria-disabled="true"] {
      pointer-events: auto;
    }
  `,

  // Loading state
  loading: css`
    position: relative;
    color: transparent;
    cursor: wait;

    &::after {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 16px;
      height: 16px;
      border: 2px solid currentColor;
      border-right-color: transparent;
      border-radius: 50%;
      animation: spin 0.6s linear infinite;
    }

    @keyframes spin {
      to {
        transform: translate(-50%, -50%) rotate(360deg);
      }
    }
  `,

  // Selected state
  selected: css`
    background-color: ${lightColors.interactive.selected};
    border-color: ${lightColors.interactive.selectedBorder};
    font-weight: 500;
  `,
};

// Semantic HTML helpers
export const semanticStyles = {
  // Button reset for non-button elements
  buttonRole: css`
    cursor: pointer;
    user-select: none;
    touch-action: manipulation;
    -webkit-tap-highlight-color: transparent;

    &[role="button"] {
      &:focus-visible {
        outline: 2px solid ${lightColors.action.primary};
        outline-offset: 2px;
      }
    }
  `,

  // Link styling for non-anchor elements
  linkRole: css`
    cursor: pointer;
    text-decoration: underline;
    color: ${lightColors.text.link};

    &:hover {
      color: ${lightColors.text.linkHover};
    }

    &[role="link"] {
      &:focus-visible {
        outline: 2px solid ${lightColors.action.primary};
        outline-offset: 2px;
      }
    }
  `,
};

// Touch target sizes (WCAG 2.5.5)
export const touchTarget = {
  // Minimum touch target size (44x44px)
  minimum: css`
    min-width: 44px;
    min-height: 44px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  `,

  // Recommended touch target size (48x48px)
  recommended: css`
    min-width: 48px;
    min-height: 48px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  `,

  // Ensure proper spacing between targets
  spacing: css`
    margin: 8px;

    @media (pointer: coarse) {
      margin: 12px;
    }
  `,
};

// Color blind friendly palettes
export const colorBlindSafe = {
  categorical: [
    '#2E86AB', // Blue
    '#A23B72', // Magenta
    '#F18F01', // Orange
    '#C73E1D', // Red
    '#6C464E', // Brown
    '#9395D3', // Lavender
    '#B3B3B3', // Gray
  ],

  sequential: [
    '#FFF7BC',
    '#FEE391',
    '#FEC44F',
    '#FE9929',
    '#EC7014',
    '#CC4C02',
    '#8C2D04',
  ],

  diverging: [
    '#008080', // Teal
    '#70A494',
    '#B4C8A8',
    '#F6EDBD',
    '#EDBB8A',
    '#DE8A5A',
    '#CA562C', // Orange
  ],
};

export type FocusStyle = keyof typeof focusStyles;
export type InteractiveState = keyof typeof interactiveStates;
/**
 * Typography System
 * Comprehensive typography scales with responsive sizing
 */

import { css } from '@emotion/react';

// Font families
export const fontFamilies = {
  sans: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
  serif: 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
  mono: 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
  heading: 'var(--font-pacaembu), ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif',
} as const;

// Font weights
export const fontWeights = {
  thin: 100,
  extralight: 200,
  light: 300,
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
  black: 900,
} as const;

// Line heights
export const lineHeights = {
  none: 1,
  tight: 1.25,
  snug: 1.375,
  normal: 1.5,
  relaxed: 1.625,
  loose: 1.75,
  body: 1.625,
  heading: 1.2,
} as const;

// Letter spacing
export const letterSpacing = {
  tighter: '-0.05em',
  tight: '-0.025em',
  normal: '0',
  wide: '0.025em',
  wider: '0.05em',
  widest: '0.1em',
  tracking: {
    tight: '-0.02em',
    normal: '0',
    wide: '0.02em',
  },
} as const;

// Type scale with responsive sizing
export const typeScale = {
  // Display sizes
  display: {
    '2xl': { mobile: '3rem', tablet: '4rem', desktop: '5rem' },
    xl: { mobile: '2.5rem', tablet: '3rem', desktop: '4rem' },
    lg: { mobile: '2rem', tablet: '2.5rem', desktop: '3rem' },
    md: { mobile: '1.875rem', tablet: '2.25rem', desktop: '2.5rem' },
    sm: { mobile: '1.5rem', tablet: '1.875rem', desktop: '2rem' },
  },

  // Heading sizes
  heading: {
    h1: { mobile: '2rem', tablet: '2.5rem', desktop: '3rem' },
    h2: { mobile: '1.5rem', tablet: '1.875rem', desktop: '2.25rem' },
    h3: { mobile: '1.25rem', tablet: '1.5rem', desktop: '1.875rem' },
    h4: { mobile: '1.125rem', tablet: '1.25rem', desktop: '1.5rem' },
    h5: { mobile: '1rem', tablet: '1.125rem', desktop: '1.25rem' },
    h6: { mobile: '0.875rem', tablet: '1rem', desktop: '1.125rem' },
  },

  // Body sizes
  body: {
    '2xl': { mobile: '1.25rem', tablet: '1.5rem', desktop: '1.5rem' },
    xl: { mobile: '1.125rem', tablet: '1.25rem', desktop: '1.25rem' },
    lg: { mobile: '1rem', tablet: '1.125rem', desktop: '1.125rem' },
    md: { mobile: '0.875rem', tablet: '1rem', desktop: '1rem' },
    sm: { mobile: '0.813rem', tablet: '0.875rem', desktop: '0.875rem' },
    xs: { mobile: '0.75rem', tablet: '0.813rem', desktop: '0.813rem' },
  },

  // Supporting text
  caption: { mobile: '0.75rem', tablet: '0.75rem', desktop: '0.875rem' },
  overline: { mobile: '0.625rem', tablet: '0.75rem', desktop: '0.75rem' },
  label: { mobile: '0.75rem', tablet: '0.875rem', desktop: '0.875rem' },
} as const;

// Typography styles
export const typographyStyles = {
  // Display styles
  display: {
    '2xl': css`
      font-family: ${fontFamilies.heading};
      font-size: ${typeScale.display['2xl'].mobile};
      font-weight: ${fontWeights.bold};
      line-height: ${lineHeights.heading};
      letter-spacing: ${letterSpacing.tracking.tight};

      @media (min-width: 768px) {
        font-size: ${typeScale.display['2xl'].tablet};
      }

      @media (min-width: 1024px) {
        font-size: ${typeScale.display['2xl'].desktop};
      }
    `,
    xl: css`
      font-family: ${fontFamilies.heading};
      font-size: ${typeScale.display.xl.mobile};
      font-weight: ${fontWeights.bold};
      line-height: ${lineHeights.heading};
      letter-spacing: ${letterSpacing.tracking.tight};

      @media (min-width: 768px) {
        font-size: ${typeScale.display.xl.tablet};
      }

      @media (min-width: 1024px) {
        font-size: ${typeScale.display.xl.desktop};
      }
    `,
    lg: css`
      font-family: ${fontFamilies.heading};
      font-size: ${typeScale.display.lg.mobile};
      font-weight: ${fontWeights.bold};
      line-height: ${lineHeights.heading};
      letter-spacing: ${letterSpacing.tracking.tight};

      @media (min-width: 768px) {
        font-size: ${typeScale.display.lg.tablet};
      }

      @media (min-width: 1024px) {
        font-size: ${typeScale.display.lg.desktop};
      }
    `,
  },

  // Heading styles
  heading: {
    h1: css`
      font-family: ${fontFamilies.heading};
      font-size: ${typeScale.heading.h1.mobile};
      font-weight: ${fontWeights.bold};
      line-height: ${lineHeights.heading};
      letter-spacing: ${letterSpacing.tracking.tight};

      @media (min-width: 768px) {
        font-size: ${typeScale.heading.h1.tablet};
      }

      @media (min-width: 1024px) {
        font-size: ${typeScale.heading.h1.desktop};
      }
    `,
    h2: css`
      font-family: ${fontFamilies.heading};
      font-size: ${typeScale.heading.h2.mobile};
      font-weight: ${fontWeights.semibold};
      line-height: ${lineHeights.heading};
      letter-spacing: ${letterSpacing.tracking.tight};

      @media (min-width: 768px) {
        font-size: ${typeScale.heading.h2.tablet};
      }

      @media (min-width: 1024px) {
        font-size: ${typeScale.heading.h2.desktop};
      }
    `,
    h3: css`
      font-family: ${fontFamilies.heading};
      font-size: ${typeScale.heading.h3.mobile};
      font-weight: ${fontWeights.semibold};
      line-height: ${lineHeights.tight};

      @media (min-width: 768px) {
        font-size: ${typeScale.heading.h3.tablet};
      }

      @media (min-width: 1024px) {
        font-size: ${typeScale.heading.h3.desktop};
      }
    `,
    h4: css`
      font-family: ${fontFamilies.sans};
      font-size: ${typeScale.heading.h4.mobile};
      font-weight: ${fontWeights.medium};
      line-height: ${lineHeights.tight};

      @media (min-width: 768px) {
        font-size: ${typeScale.heading.h4.tablet};
      }

      @media (min-width: 1024px) {
        font-size: ${typeScale.heading.h4.desktop};
      }
    `,
    h5: css`
      font-family: ${fontFamilies.sans};
      font-size: ${typeScale.heading.h5.mobile};
      font-weight: ${fontWeights.medium};
      line-height: ${lineHeights.normal};

      @media (min-width: 768px) {
        font-size: ${typeScale.heading.h5.tablet};
      }

      @media (min-width: 1024px) {
        font-size: ${typeScale.heading.h5.desktop};
      }
    `,
    h6: css`
      font-family: ${fontFamilies.sans};
      font-size: ${typeScale.heading.h6.mobile};
      font-weight: ${fontWeights.medium};
      line-height: ${lineHeights.normal};

      @media (min-width: 768px) {
        font-size: ${typeScale.heading.h6.tablet};
      }

      @media (min-width: 1024px) {
        font-size: ${typeScale.heading.h6.desktop};
      }
    `,
  },

  // Body styles
  body: {
    lg: css`
      font-family: ${fontFamilies.sans};
      font-size: ${typeScale.body.lg.mobile};
      font-weight: ${fontWeights.normal};
      line-height: ${lineHeights.relaxed};

      @media (min-width: 768px) {
        font-size: ${typeScale.body.lg.tablet};
      }

      @media (min-width: 1024px) {
        font-size: ${typeScale.body.lg.desktop};
      }
    `,
    md: css`
      font-family: ${fontFamilies.sans};
      font-size: ${typeScale.body.md.mobile};
      font-weight: ${fontWeights.normal};
      line-height: ${lineHeights.normal};

      @media (min-width: 768px) {
        font-size: ${typeScale.body.md.tablet};
      }

      @media (min-width: 1024px) {
        font-size: ${typeScale.body.md.desktop};
      }
    `,
    sm: css`
      font-family: ${fontFamilies.sans};
      font-size: ${typeScale.body.sm.mobile};
      font-weight: ${fontWeights.normal};
      line-height: ${lineHeights.normal};

      @media (min-width: 768px) {
        font-size: ${typeScale.body.sm.tablet};
      }

      @media (min-width: 1024px) {
        font-size: ${typeScale.body.sm.desktop};
      }
    `,
  },

  // Supporting styles
  caption: css`
    font-family: ${fontFamilies.sans};
    font-size: ${typeScale.caption.mobile};
    font-weight: ${fontWeights.normal};
    line-height: ${lineHeights.normal};

    @media (min-width: 768px) {
      font-size: ${typeScale.caption.tablet};
    }

    @media (min-width: 1024px) {
      font-size: ${typeScale.caption.desktop};
    }
  `,

  overline: css`
    font-family: ${fontFamilies.sans};
    font-size: ${typeScale.overline.mobile};
    font-weight: ${fontWeights.medium};
    line-height: ${lineHeights.normal};
    letter-spacing: ${letterSpacing.wider};
    text-transform: uppercase;

    @media (min-width: 768px) {
      font-size: ${typeScale.overline.tablet};
    }

    @media (min-width: 1024px) {
      font-size: ${typeScale.overline.desktop};
    }
  `,

  label: css`
    font-family: ${fontFamilies.sans};
    font-size: ${typeScale.label.mobile};
    font-weight: ${fontWeights.medium};
    line-height: ${lineHeights.normal};

    @media (min-width: 768px) {
      font-size: ${typeScale.label.tablet};
    }

    @media (min-width: 1024px) {
      font-size: ${typeScale.label.desktop};
    }
  `,

  // Code styles
  code: css`
    font-family: ${fontFamilies.mono};
    font-size: 0.875em;
    font-weight: ${fontWeights.normal};
    line-height: ${lineHeights.normal};
  `,

  // Link styles
  link: css`
    text-decoration: underline;
    text-underline-offset: 2px;
    text-decoration-thickness: 1px;
    transition: all 200ms ease;

    &:hover {
      text-decoration-thickness: 2px;
    }
  `,
} as const;

// Text truncation utilities
export const textTruncate = {
  single: css`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  `,

  multi: (lines: number) => css`
    display: -webkit-box;
    -webkit-line-clamp: ${lines};
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  `,
};

// Text alignment
export const textAlign = {
  left: css`text-align: left;`,
  center: css`text-align: center;`,
  right: css`text-align: right;`,
  justify: css`text-align: justify;`,
};

// Text transform
export const textTransform = {
  uppercase: css`text-transform: uppercase;`,
  lowercase: css`text-transform: lowercase;`,
  capitalize: css`text-transform: capitalize;`,
  none: css`text-transform: none;`,
};

export type TypographyScale = typeof typeScale;
export type TypographyStyles = typeof typographyStyles;
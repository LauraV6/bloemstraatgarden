import { css } from '@emotion/react';
import { Theme } from '@emotion/react';

// Media query helpers
export const media = {
  xs: (styles: ReturnType<typeof css>) => css`
    @media (min-width: 480px) {
      ${styles}
    }
  `,
  sm: (styles: ReturnType<typeof css>) => css`
    @media (min-width: 640px) {
      ${styles}
    }
  `,
  md: (styles: ReturnType<typeof css>) => css`
    @media (min-width: 768px) {
      ${styles}
    }
  `,
  lg: (styles: ReturnType<typeof css>) => css`
    @media (min-width: 1024px) {
      ${styles}
    }
  `,
  xl: (styles: ReturnType<typeof css>) => css`
    @media (min-width: 1280px) {
      ${styles}
    }
  `,
};

// Common animations
export const animations = {
  fadeIn: css`
    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
  `,
  slideInFromBottom: css`
    @keyframes slideInFromBottom {
      from {
        transform: translateY(100%);
        opacity: 0;
      }
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }
  `,
  slideInFromRight: css`
    @keyframes slideInFromRight {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
  `,
  pulse: css`
    @keyframes pulse {
      0%, 100% {
        opacity: 1;
      }
      50% {
        opacity: 0.5;
      }
    }
  `,
  spin: css`
    @keyframes spin {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
  `,
};

// Common mixins
export const mixins = {
  flexCenter: css`
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  absoluteFill: css`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  `,
  truncate: css`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  `,
  visuallyHidden: css`
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  `,
  buttonReset: css`
    background: none;
    border: none;
    padding: 0;
    font: inherit;
    cursor: pointer;
    outline: inherit;
  `,
  listReset: css`
    list-style: none;
    margin: 0;
    padding: 0;
  `,
};

// Button styles
export const buttonStyles = (theme: Theme) => ({
  base: css`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: ${theme.spacing.sm} ${theme.spacing.md};
    font-size: ${theme.typography.fontSize.base};
    font-weight: ${theme.typography.fontWeight.medium};
    border-radius: ${theme.radii.md};
    transition: all ${theme.transitions.fast};
    cursor: pointer;
    border: 1px solid transparent;
    
    &:focus {
      outline: 1px solid ${theme.colors.primary};
      outline-offset: 2px;
    }
    
    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  `,
  primary: css`
    background-color: ${theme.colors.primary};
    color: ${theme.colors.white};
    
    &:hover:not(:disabled) {
      background-color: ${theme.colors.primary};
      filter: brightness(0.9);
    }
  `,
  secondary: css`
    background-color: ${theme.colors.secondary};
    color: ${theme.colors.white};
    
    &:hover:not(:disabled) {
      background-color: ${theme.colors.secondary};
      filter: brightness(0.9);
    }
  `,
  outline: css`
    background-color: transparent;
    color: ${theme.colors.primary};
    border-color: ${theme.colors.primary};
    
    &:hover:not(:disabled) {
      background-color: ${theme.colors.primary};
      color: ${theme.colors.white};
    }
  `,
  ghost: css`
    background-color: transparent;
    color: ${theme.colors.text};
    
    &:hover:not(:disabled) {
      background-color: ${theme.colors.surface};
    }
  `,
});

// Card styles
export const cardStyles = (theme: Theme) => css`
  background-color: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radii.lg};
  padding: ${theme.spacing.lg};
  box-shadow: ${theme.shadows.sm};
  transition: box-shadow ${theme.transitions.fast};
  
  &:hover {
    box-shadow: ${theme.shadows.md};
  }
`;

// Container styles
export const containerStyles = (theme: Theme) => css`
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.md};
  
  ${media.md(css`
    padding: 0 ${theme.spacing.lg};
  `)}
  
  ${media.lg(css`
    padding: 0 ${theme.spacing.xl};
  `)}
`;
/**
 * Variant System
 * Consistent component variations and styling patterns
 */

import { css } from '@emotion/react';
import { Theme } from '@emotion/react';

// Generic variant type
export type Variant = 'primary' | 'secondary' | 'tertiary' | 'danger' | 'warning' | 'success' | 'info' | 'ghost' | 'outline';
export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type Shape = 'square' | 'rounded' | 'pill' | 'circle';

// Button variants
export const buttonVariants = (theme: Theme) => ({
  primary: css`
    background-color: ${theme.colors.action.primary};
    color: ${theme.colors.white};
    border: 1px solid transparent;

    &:hover:not(:disabled) {
      background-color: ${theme.colors.action.primaryHover};
    }

    &:active:not(:disabled) {
      background-color: ${theme.colors.action.primaryActive};
    }

    &:disabled {
      background-color: ${theme.colors.action.primaryDisabled};
      color: ${theme.colors.text.disabled};
    }
  `,

  secondary: css`
    background-color: ${theme.colors.action.secondary};
    color: ${theme.colors.white};
    border: 1px solid transparent;

    &:hover:not(:disabled) {
      background-color: ${theme.colors.action.secondaryHover};
    }

    &:active:not(:disabled) {
      background-color: ${theme.colors.action.secondaryActive};
    }

    &:disabled {
      background-color: ${theme.colors.action.secondaryDisabled};
      color: ${theme.colors.text.disabled};
    }
  `,

  tertiary: css`
    background-color: ${theme.colors.surface.tertiary};
    color: ${theme.colors.text.primary};
    border: 1px solid transparent;

    &:hover:not(:disabled) {
      background-color: ${theme.colors.interactive.hover};
    }

    &:active:not(:disabled) {
      background-color: ${theme.colors.interactive.active};
    }

    &:disabled {
      opacity: 0.5;
    }
  `,

  danger: css`
    background-color: ${theme.colors.action.danger};
    color: ${theme.colors.white};
    border: 1px solid transparent;

    &:hover:not(:disabled) {
      background-color: ${theme.colors.action.dangerHover};
    }

    &:active:not(:disabled) {
      background-color: ${theme.colors.action.dangerActive};
    }

    &:disabled {
      background-color: ${theme.colors.action.dangerDisabled};
      color: ${theme.colors.text.disabled};
    }
  `,

  warning: css`
    background-color: ${theme.colors.status.warning};
    color: ${theme.colors.text.primary};
    border: 1px solid transparent;

    &:hover:not(:disabled) {
      filter: brightness(0.9);
    }

    &:active:not(:disabled) {
      filter: brightness(0.8);
    }

    &:disabled {
      opacity: 0.5;
    }
  `,

  success: css`
    background-color: ${theme.colors.status.success};
    color: ${theme.colors.white};
    border: 1px solid transparent;

    &:hover:not(:disabled) {
      filter: brightness(0.9);
    }

    &:active:not(:disabled) {
      filter: brightness(0.8);
    }

    &:disabled {
      opacity: 0.5;
    }
  `,

  info: css`
    background-color: ${theme.colors.status.info};
    color: ${theme.colors.white};
    border: 1px solid transparent;

    &:hover:not(:disabled) {
      filter: brightness(0.9);
    }

    &:active:not(:disabled) {
      filter: brightness(0.8);
    }

    &:disabled {
      opacity: 0.5;
    }
  `,

  ghost: css`
    background-color: transparent;
    color: ${theme.colors.text.primary};
    border: 1px solid transparent;

    &:hover:not(:disabled) {
      background-color: ${theme.colors.interactive.hover};
    }

    &:active:not(:disabled) {
      background-color: ${theme.colors.interactive.active};
    }

    &:disabled {
      opacity: 0.5;
    }
  `,

  outline: css`
    background-color: transparent;
    color: ${theme.colors.action.primary};
    border: 1px solid ${theme.colors.action.primary};

    &:hover:not(:disabled) {
      background-color: ${theme.colors.action.primary};
      color: ${theme.colors.white};
    }

    &:active:not(:disabled) {
      background-color: ${theme.colors.action.primaryActive};
      border-color: ${theme.colors.action.primaryActive};
    }

    &:disabled {
      opacity: 0.5;
      border-color: ${theme.colors.border.default};
      color: ${theme.colors.text.disabled};
    }
  `,
});

// Size variants
export const sizeVariants = (theme: Theme) => ({
  xs: css`
    padding: ${theme.spacing[1]}px ${theme.spacing[2]}px;
    font-size: ${theme.typography.fontSize.xs};
    min-height: 28px;
  `,

  sm: css`
    padding: ${theme.spacing[2]}px ${theme.spacing[3]}px;
    font-size: ${theme.typography.fontSize.sm};
    min-height: 32px;
  `,

  md: css`
    padding: ${theme.spacing[2.5]}px ${theme.spacing[4]}px;
    font-size: ${theme.typography.fontSize.base};
    min-height: 40px;
  `,

  lg: css`
    padding: ${theme.spacing[3]}px ${theme.spacing[6]}px;
    font-size: ${theme.typography.fontSize.lg};
    min-height: 48px;
  `,

  xl: css`
    padding: ${theme.spacing[4]}px ${theme.spacing[8]}px;
    font-size: ${theme.typography.fontSize.xl};
    min-height: 56px;
  `,
});

// Shape variants
export const shapeVariants = (theme: Theme) => ({
  square: css`
    border-radius: 0;
  `,

  rounded: css`
    border-radius: ${theme.radii.md}px;
  `,

  pill: css`
    border-radius: ${theme.radii.pill}px;
  `,

  circle: css`
    border-radius: 50%;
    aspect-ratio: 1;
  `,
});

// Badge variants
export const badgeVariants = (theme: Theme) => ({
  primary: css`
    background-color: ${theme.colors.brand.primaryLight};
    color: ${theme.colors.brand.primaryDark};
  `,

  secondary: css`
    background-color: ${theme.colors.surface.secondary};
    color: ${theme.colors.text.secondary};
  `,

  success: css`
    background-color: ${theme.colors.status.successBackground};
    color: ${theme.colors.status.success};
    border: 1px solid ${theme.colors.status.successBorder};
  `,

  warning: css`
    background-color: ${theme.colors.status.warningBackground};
    color: ${theme.colors.status.warning};
    border: 1px solid ${theme.colors.status.warningBorder};
  `,

  error: css`
    background-color: ${theme.colors.status.errorBackground};
    color: ${theme.colors.status.error};
    border: 1px solid ${theme.colors.status.errorBorder};
  `,

  info: css`
    background-color: ${theme.colors.status.infoBackground};
    color: ${theme.colors.status.info};
    border: 1px solid ${theme.colors.status.infoBorder};
  `,
});

// Alert variants
export const alertVariants = (theme: Theme) => ({
  success: css`
    background-color: ${theme.colors.status.successBackground};
    border-left: 4px solid ${theme.colors.status.success};
    color: ${theme.colors.text.primary};

    & [role="img"] {
      color: ${theme.colors.status.success};
    }
  `,

  warning: css`
    background-color: ${theme.colors.status.warningBackground};
    border-left: 4px solid ${theme.colors.status.warning};
    color: ${theme.colors.text.primary};

    & [role="img"] {
      color: ${theme.colors.status.warning};
    }
  `,

  error: css`
    background-color: ${theme.colors.status.errorBackground};
    border-left: 4px solid ${theme.colors.status.error};
    color: ${theme.colors.text.primary};

    & [role="img"] {
      color: ${theme.colors.status.error};
    }
  `,

  info: css`
    background-color: ${theme.colors.status.infoBackground};
    border-left: 4px solid ${theme.colors.status.info};
    color: ${theme.colors.text.primary};

    & [role="img"] {
      color: ${theme.colors.status.info};
    }
  `,
});

// Input variants
export const inputVariants = (theme: Theme) => ({
  default: css`
    border: 1px solid ${theme.colors.border.default};
    background-color: ${theme.colors.surface.primary};

    &:hover:not(:disabled):not(:focus) {
      border-color: ${theme.colors.border.dark};
    }

    &:focus {
      border-color: ${theme.colors.border.focused};
      box-shadow: 0 0 0 3px ${theme.colors.interactive.focusRing};
    }
  `,

  error: css`
    border: 1px solid ${theme.colors.border.error};
    background-color: ${theme.colors.surface.primary};

    &:hover:not(:disabled):not(:focus) {
      border-color: ${theme.colors.border.error};
    }

    &:focus {
      border-color: ${theme.colors.border.error};
      box-shadow: 0 0 0 3px ${theme.colors.status.errorBackground};
    }
  `,

  success: css`
    border: 1px solid ${theme.colors.border.success};
    background-color: ${theme.colors.surface.primary};

    &:hover:not(:disabled):not(:focus) {
      border-color: ${theme.colors.border.success};
    }

    &:focus {
      border-color: ${theme.colors.border.success};
      box-shadow: 0 0 0 3px ${theme.colors.status.successBackground};
    }
  `,

  filled: css`
    border: 1px solid transparent;
    background-color: ${theme.colors.surface.secondary};

    &:hover:not(:disabled):not(:focus) {
      background-color: ${theme.colors.surface.tertiary};
    }

    &:focus {
      background-color: ${theme.colors.surface.primary};
      border-color: ${theme.colors.border.focused};
      box-shadow: 0 0 0 3px ${theme.colors.interactive.focusRing};
    }
  `,
});

// Card variants
export const cardVariants = (theme: Theme) => ({
  elevated: css`
    background-color: ${theme.colors.surface.elevated};
    box-shadow: ${theme.shadows.md};
    border: none;

    &:hover {
      box-shadow: ${theme.shadows.lg};
    }
  `,

  outlined: css`
    background-color: ${theme.colors.surface.primary};
    box-shadow: none;
    border: 1px solid ${theme.colors.border.default};

    &:hover {
      border-color: ${theme.colors.border.dark};
    }
  `,

  filled: css`
    background-color: ${theme.colors.surface.secondary};
    box-shadow: none;
    border: none;

    &:hover {
      background-color: ${theme.colors.surface.tertiary};
    }
  `,

  interactive: css`
    background-color: ${theme.colors.surface.primary};
    box-shadow: ${theme.shadows.sm};
    border: 1px solid ${theme.colors.border.default};
    cursor: pointer;
    transition: ${theme.transitions.all.fast};

    &:hover {
      transform: translateY(-2px);
      box-shadow: ${theme.shadows.md};
      border-color: ${theme.colors.border.focused};
    }

    &:active {
      transform: translateY(0);
      box-shadow: ${theme.shadows.sm};
    }
  `,
});

// Helper function to apply variants
export const applyVariant = <T extends Record<string, any>>(
  variants: T,
  variant?: keyof T
) => {
  if (!variant || !variants[variant]) {
    return css``;
  }
  return variants[variant];
};

// Compose multiple variants
export const composeVariants = (...variants: any[]) => css`
  ${variants.filter(Boolean).join('')}
`;

// Create variant props type
export type VariantProps<T extends Record<string, any>> = {
  variant?: keyof T;
};

// Create size props type
export type SizeProps = {
  size?: Size;
};

// Create shape props type
export type ShapeProps = {
  shape?: Shape;
};
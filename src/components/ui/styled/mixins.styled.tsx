import { css } from '@emotion/react';
import { Theme } from '@emotion/react';

// Function mixins that take theme as parameter
export const focusStyles = (theme: Theme) => css`
  &:focus-visible {
    outline: 2px solid ${theme.colors.primary};
    outline-offset: 2px;
    border-radius: ${theme.radii.sm};
  }
`;

export const hoverLift = (theme: Theme) => css`
  transition: transform ${theme.transitions.normal},
              box-shadow ${theme.transitions.normal};

  &:hover:not(:disabled) {
    transform: translateY(-4px);
    box-shadow: ${theme.shadows.lg};
  }

  &:active:not(:disabled) {
    transform: translateY(-2px);
  }
`;

export const hoverScale = (theme: Theme) => css`
  transition: transform ${theme.transitions.fast};

  &:hover:not(:disabled) {
    transform: scale(1.05);
  }

  &:active:not(:disabled) {
    transform: scale(0.98);
  }
`;

export const glassMorphism = (theme: Theme) => css`
  background: ${theme.colors.transparent1};
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid ${theme.colors.border};
`;

export const scrollbarStyles = (theme: Theme) => css`
  scrollbar-width: thin;
  scrollbar-color: ${theme.colors.primary} ${theme.colors.border};

  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  &::-webkit-scrollbar-track {
    background: ${theme.colors.border};
    border-radius: ${theme.radii.sm};
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${theme.colors.primary};
    border-radius: ${theme.radii.sm};
    border: 2px solid ${theme.colors.border};
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: ${theme.colors.primaryDark};
  }
`;

export const cardShadow = (theme: Theme) => css`
  box-shadow: ${theme.shadows.md};

  @media (min-width: ${theme.breakpoints.md}) {
    box-shadow: ${theme.shadows.lg};
  }
`;

export const gradientText = (theme: Theme) => css`
  background: linear-gradient(
    90deg,
    ${theme.colors.primary} 0%,
    ${theme.colors.primaryDark} 50%,
    ${theme.colors.primary} 100%
  );
  background-size: 200% auto;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

// Static mixins (no theme dependency)
export const truncateSingleLine = css`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const truncateMultiLine = (lines: number) => css`
  display: -webkit-box;
  -webkit-line-clamp: ${lines};
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

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

export const flexCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const flexBetween = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const absoluteFill = css`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

export const buttonReset = css`
  background: none;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
`;

export const listReset = css`
  list-style: none;
  margin: 0;
  padding: 0;
`;

export const linkReset = css`
  color: inherit;
  text-decoration: none;

  &:hover {
    text-decoration: none;
  }
`;

export const noScrollbar = css`
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const aspectRatio = (width: number, height: number) => css`
  position: relative;

  &::before {
    content: '';
    display: block;
    padding-bottom: ${(height / width) * 100}%;
  }

  > * {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

// Inline mixins for use directly in styled components
// These use template literals without the css tag to avoid TypeScript issues
export const inlineFocusStyles = `
  &:focus-visible {
    outline: 2px solid \${props => props.theme.colors.primary};
    outline-offset: 2px;
    border-radius: \${props => props.theme.radii.sm};
  }
`;

export const inlineHoverLift = `
  transition: transform \${props => props.theme.transitions.normal},
              box-shadow \${props => props.theme.transitions.normal};

  &:hover:not(:disabled) {
    transform: translateY(-4px);
    box-shadow: \${props => props.theme.shadows.lg};
  }

  &:active:not(:disabled) {
    transform: translateY(-2px);
  }
`;

export const inlineHoverScale = `
  transition: transform \${props => props.theme.transitions.fast};

  &:hover:not(:disabled) {
    transform: scale(1.05);
  }

  &:active:not(:disabled) {
    transform: scale(0.98);
  }
`;

export const inlineGlassMorphism = `
  background: \${props => props.theme.colors.transparent1};
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid \${props => props.theme.colors.border};
`;

export const inlineScrollbarStyles = `
  scrollbar-width: thin;
  scrollbar-color: \${props => props.theme.colors.primary} \${props => props.theme.colors.border};

  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  &::-webkit-scrollbar-track {
    background: \${props => props.theme.colors.border};
    border-radius: \${props => props.theme.radii.sm};
  }

  &::-webkit-scrollbar-thumb {
    background-color: \${props => props.theme.colors.primary};
    border-radius: \${props => props.theme.radii.sm};
    border: 2px solid \${props => props.theme.colors.border};
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: \${props => props.theme.colors.primaryDark};
  }
`;

export const inlineCardShadow = `
  box-shadow: \${props => props.theme.shadows.md};

  @media (min-width: \${props => props.theme.breakpoints.md}) {
    box-shadow: \${props => props.theme.shadows.lg};
  }
`;

export const inlineGradientText = `
  background: linear-gradient(
    90deg,
    \${props => props.theme.colors.primary} 0%,
    \${props => props.theme.colors.primaryDark} 50%,
    \${props => props.theme.colors.primary} 100%
  );
  background-size: 200% auto;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;
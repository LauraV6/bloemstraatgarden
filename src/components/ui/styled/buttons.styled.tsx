import styled from '@emotion/styled';
import { css } from '@emotion/react';

export const BaseButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.spacing.sm};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  font-size: ${props => props.theme.typography.fontSize.base};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  font-family: ${props => props.theme.typography.fontFamily};
  line-height: ${props => props.theme.typography.lineHeight.normal};
  border-radius: ${props => props.theme.radii.md};
  border: 1px solid transparent;
  cursor: pointer;
  transition: all ${props => props.theme.transitions.fast};
  text-decoration: none;
  user-select: none;

  &:focus-visible {
    outline: 2px solid ${props => props.theme.colors.primary};
    outline-offset: 2px;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  svg {
    width: 1.125em;
    height: 1.125em;
  }
`;

export const PrimaryButton = styled(BaseButton)`
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};

  &:hover:not(:disabled) {
    background-color: ${props => props.theme.colors.primaryDark};
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.md};
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }
`;

export const SecondaryButton = styled(BaseButton)`
  background-color: ${props => props.theme.colors.secondary};
  color: ${props => props.theme.colors.white};

  &:hover:not(:disabled) {
    filter: brightness(0.9);
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.md};
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }
`;

export const OutlineButton = styled(BaseButton)`
  background-color: transparent;
  color: ${props => props.theme.colors.primary};
  border-color: ${props => props.theme.colors.primary};

  &:hover:not(:disabled) {
    background-color: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.white};
  }

  &:active:not(:disabled) {
    transform: scale(0.98);
  }
`;

export const GhostButton = styled(BaseButton)`
  background-color: transparent;
  color: ${props => props.theme.colors.text};
  border-color: transparent;
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};

  &:hover:not(:disabled) {
    background-color: ${props => props.theme.colors.transparent1};
  }

  &:active:not(:disabled) {
    background-color: ${props => props.theme.colors.transparent};
  }
`;

export const IconButton = styled(BaseButton)`
  padding: ${props => props.theme.spacing.sm};
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: transparent;
  border: 1px solid ${props => props.theme.colors.border};

  &:hover:not(:disabled) {
    background-color: ${props => props.theme.colors.transparent1};
    border-color: ${props => props.theme.colors.primary};
  }

  svg {
    width: 1.25rem;
    height: 1.25rem;
  }
`;

const sizeStyles = {
  small: css`
    padding: 0.375rem 0.75rem;
    font-size: 0.875rem;
  `,
  medium: css`
    padding: 0.5rem 1rem;
    font-size: 1rem;
  `,
  large: css`
    padding: 0.75rem 1.5rem;
    font-size: 1.125rem;
  `,
};

export const SizedButton = styled(BaseButton)<{ size?: 'small' | 'medium' | 'large' }>`
  ${props => sizeStyles[props.size || 'medium']}
`;

export const ButtonGroup = styled.div<{ direction?: 'horizontal' | 'vertical' }>`
  display: flex;
  flex-direction: ${props => props.direction === 'vertical' ? 'column' : 'row'};
  gap: ${props => props.theme.spacing.sm};

  ${BaseButton} {
    flex: 1;
  }
`;
import styled from '@emotion/styled';
import { css } from '@emotion/react';

export const BaseCard = styled.article`
  background-color: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.radii.lg};
  overflow: hidden;
  transition: all ${props => props.theme.transitions.normal};

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    box-shadow: ${props => props.theme.shadows.md};
  }
`;

export const HoverCard = styled(BaseCard)`
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${props => props.theme.shadows.lg};
  }

  &:active {
    transform: translateY(-2px);
  }
`;

export const CardImage = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
  background-color: ${props => props.theme.colors.green5};

  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    height: 250px;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform ${props => props.theme.transitions.normal};
  }

  &:hover img {
    transform: scale(1.05);
  }
`;

export const CardContent = styled.div`
  padding: ${props => props.theme.spacing.lg};

  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    padding: ${props => props.theme.spacing.xl};
  }
`;

export const CardHeader = styled.header`
  margin-bottom: ${props => props.theme.spacing.md};

  h2, h3 {
    margin: 0;
    color: ${props => props.theme.colors.primary};
    font-size: ${props => props.theme.typography.fontSize.xl};
    font-weight: ${props => props.theme.typography.fontWeight.semibold};
    line-height: ${props => props.theme.typography.lineHeight.tight};
  }
`;

export const CardBody = styled.div`
  color: ${props => props.theme.colors.textSecondary};
  line-height: ${props => props.theme.typography.lineHeight.relaxed};

  p {
    margin: 0 0 ${props => props.theme.spacing.md} 0;

    &:last-child {
      margin-bottom: 0;
    }
  }
`;

export const CardFooter = styled.footer`
  margin-top: ${props => props.theme.spacing.lg};
  padding-top: ${props => props.theme.spacing.md};
  border-top: 1px solid ${props => props.theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${props => props.theme.spacing.md};
`;

export const CardGrid = styled.div<{ columns?: number; responsive?: boolean }>`
  display: grid;
  gap: ${props => props.theme.spacing.xl};

  ${props => props.responsive !== false ? css`
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));

    @media (min-width: ${props.theme.breakpoints.md}) {
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    }
  ` : css`
    grid-template-columns: repeat(${props.columns || 3}, 1fr);
  `}
`;

export const Badge = styled.span<{ variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' }>`
  display: inline-flex;
  align-items: center;
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  font-size: ${props => props.theme.typography.fontSize.sm};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  border-radius: ${props => props.theme.radii.full};
  white-space: nowrap;

  ${props => {
    const variant = props.variant || 'primary';
    const colors = {
      primary: css`
        background-color: ${props.theme.colors.transparent};
        color: ${props.theme.colors.primaryDark};
      `,
      secondary: css`
        background-color: ${props.theme.colors.secondary}20;
        color: ${props.theme.colors.secondary};
      `,
      success: css`
        background-color: ${props.theme.colors.success};
        color: ${props.theme.colors.white};
      `,
      warning: css`
        background-color: ${props.theme.colors.warning}20;
        color: ${props.theme.colors.warning};
      `,
      error: css`
        background-color: ${props.theme.colors.error};
        color: ${props.theme.colors.errorBright};
      `
    };
    return colors[variant];
  }}
`;

export const DateBadge = styled.time`
  position: absolute;
  top: ${props => props.theme.spacing.md};
  right: ${props => props.theme.spacing.md};
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  font-size: ${props => props.theme.typography.fontSize.xs};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  color: ${props => props.theme.colors.black};
  background-color: ${props => props.theme.colors.transparent1};
  backdrop-filter: blur(10px);
  border-radius: ${props => props.theme.radii.md};
  z-index: 5;
`;
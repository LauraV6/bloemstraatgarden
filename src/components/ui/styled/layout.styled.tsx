import styled from '@emotion/styled';
import { css } from '@emotion/react';

export const Header = styled.header`
  background-color: ${props => props.theme.colors.surface};
  border-bottom: 1px solid ${props => props.theme.colors.border};
  padding: ${props => props.theme.spacing.md} 0;
`;

export const Footer = styled.footer`
  background-color: ${props => props.theme.colors.surface};
  border-top: 1px solid ${props => props.theme.colors.border};
  padding: ${props => props.theme.spacing.xl} 0;
  margin-top: auto;
`;

export const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.lg};
`;

export const NavList = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: ${props => props.theme.spacing.md};

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    flex-direction: column;
  }
`;

export const NavItem = styled.li`
  margin: 0;
`;

export const NavLink = styled.a<{ $isActive?: boolean }>`
  color: ${props => props.$isActive ? props.theme.colors.primary : props.theme.colors.text};
  text-decoration: none;
  font-weight: ${props => props.$isActive ? props.theme.typography.fontWeight.semibold : props.theme.typography.fontWeight.normal};
  transition: color ${props => props.theme.transitions.fast};

  &:hover {
    color: ${props => props.theme.colors.primary};
  }

  &:focus-visible {
    outline: 2px solid ${props => props.theme.colors.primary};
    outline-offset: 2px;
    border-radius: 2px;
  }
`;

export const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  font-size: ${props => props.theme.typography.fontSize.xl};
  color: ${props => props.theme.colors.primary};
`;

export const HeroSection = styled.section<{ $backgroundImage?: string; $overlay?: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  padding: ${props => props.theme.spacing.xxl} ${props => props.theme.spacing.xl};
  background-color: ${props => props.theme.colors.primaryDark};
  color: ${props => props.theme.colors.white};
  text-align: center;
  overflow: hidden;

  ${props => props.$backgroundImage && css`
    background-image: url(${props.$backgroundImage});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  `}

  ${props => props.$overlay && css`
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: 1;
    }

    > * {
      position: relative;
      z-index: 2;
    }
  `}

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    min-height: 500px;
  }
`;

export const HeroContent = styled.div`
  max-width: 800px;
  margin: 0 auto;

  h1 {
    color: ${props => props.theme.colors.white};
    margin-bottom: ${props => props.theme.spacing.lg};
  }

  p {
    font-size: ${props => props.theme.typography.fontSize.lg};
    margin-bottom: ${props => props.theme.spacing.xl};
    opacity: 0.9;
  }
`;

export const Grid = styled.div<{ columns?: number; gap?: string }>`
  display: grid;
  grid-template-columns: repeat(${props => props.columns || 12}, 1fr);
  gap: ${props => props.gap || props.theme.spacing.lg};
`;

export const Column = styled.div<{ span?: number; offset?: number }>`
  grid-column: span ${props => props.span || 1};
  ${props => props.offset && css`
    margin-left: calc(${props.offset} * (100% / 12));
  `}

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    grid-column: span 12;
    margin-left: 0;
  }
`;

export const Stack = styled.div<{ spacing?: string; direction?: 'horizontal' | 'vertical' }>`
  display: flex;
  flex-direction: ${props => props.direction === 'horizontal' ? 'row' : 'column'};
  gap: ${props => props.spacing || props.theme.spacing.md};
`;

export const Divider = styled.hr<{ spacing?: string; color?: string }>`
  border: none;
  height: 1px;
  background-color: ${props => props.color || props.theme.colors.border};
  margin: ${props => props.spacing || props.theme.spacing.lg} 0;
`;

export const VisuallyHidden = styled.span`
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
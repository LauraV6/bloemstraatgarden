import styled from '@emotion/styled';
import { css } from '@emotion/react';

// Helper to filter out custom props from DOM elements
const withTransientProps = (Component: any) => 
  styled(Component, {
    shouldForwardProp: (prop) => 
      prop !== 'isScrolled' && 
      prop !== 'whileHover' && 
      prop !== 'whileTap' && 
      prop !== 'transition' &&
      prop !== 'animate' &&
      prop !== 'initial' &&
      prop !== 'exit' &&
      prop !== 'variants' &&
      prop !== 'style' &&
      prop !== 'onMouseEnter' &&
      prop !== 'onMouseLeave' &&
      prop !== 'onAnimationStart' &&
      prop !== 'onAnimationComplete'
  });

export const HeaderContainer = withTransientProps('header')<{ isScrolled: boolean }>`
  position: fixed;
  top: 0;
  width: 100%;
  backdrop-filter: blur(15px);
  background-color: ${props => props.isScrolled ? props.theme.colors.menu : props.theme.colors.background};
  border-bottom: 1px solid ${props => props.theme.colors.border};
  transition: 0.3s;
  z-index: 100;

  ${props => props.isScrolled && css`
    background-color: ${props.theme.colors.menu};
  `}
`;

export const Nav = withTransientProps('nav')<{ isScrolled: boolean }>`
  position: relative;
  overflow: hidden;
  max-width: 1200px;
  text-align: center;
  transition: 0.4s;
  padding: 1rem;
  margin: 0 auto;

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    display: grid;
    grid-template-columns: 162px auto 162px;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    padding: 1.5rem 2rem;
  }

  ${props => props.isScrolled && css`
    display: flex;
    align-items: center;
    gap: 10px;
    text-align: left;
    padding: 1rem;
  `}
`;

export const LogoLink = withTransientProps('a')<{ isScrolled: boolean }>`
  position: relative;
  display: block;
  width: 100%;
  order: 0;
  min-height: 30px;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    order: -1;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    display: contents;
    height: auto;
  }

  svg {
    height: 100%;
    max-height: 80px;
    width: auto;
    transition: 0.5s;

    @media (min-width: ${props => props.theme.breakpoints.md}) {
      max-height: 105px;
      width: 100%;
      height: auto;
    }
  }

  ${props => props.isScrolled && css`
    display: flex;
    width: 120px;
    max-width: 120px;
    min-height: 35px;

    @media (min-width: ${props.theme.breakpoints.md}) {
      max-width: 100%;
      width: 100%;
    }

    svg {
      height: 35px;

      @media (min-width: ${props.theme.breakpoints.md}) {
        height: 40px;
      }
    }

    &::before,
    &::after {
      content: unset;
    }
  `}
`;

export const SocialLinks = withTransientProps('div')<{ isScrolled: boolean }>`
  display: flex;
  gap: 10px;
  flex-shrink: 0;
`;

export const ShareIcon = withTransientProps('a')<{ isScrolled: boolean; className?: string }>`
  position: relative;
  padding: 0.2rem 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  background-color: transparent;
  border: 1px solid ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.primary};
  transform-origin: center;
  will-change: transform;

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    height: 40px;
    width: 40px;
    border-radius: 50%;
    font-size: 1.1em;
    padding: 0;
  }

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    display: none;
  }

  ${props => props.isScrolled && css`
    @media (min-width: ${props.theme.breakpoints.md}) {
      height: 35px;
      width: 35px;
      font-size: 1em;
    }
  `}

  svg {
    color: ${props => props.theme.colors.primary};
    transition: color 0.15s ease;
    
    path {
      fill: ${props => props.theme.colors.primary};
    }
  }

  &:hover,
  &:focus {
    background-color: ${props => props.theme.colors.primary};
    color: white;
    text-decoration: none;
    transform: scale(1.1);

    svg {
      color: white;
      
      path {
        fill: white;
      }
    }
  }

  &.whapp:hover {
    transform: scale(1.1) rotate(15deg);
  }

  &.linkedin:hover {
    transform: scale(1.1) rotate(-15deg);
  }

  &.insta:hover {
    transform: scale(1.1) rotate(15deg);
  }

  &:active {
    background-image: linear-gradient(rgb(0 0 0 / 40%) 0 0);
    transform: scale(0.95);
  }
`;
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import React from 'react';

// Using a more flexible type to avoid JSX namespace issues
const withTransientProps = (Component: React.ComponentType<Record<string, unknown>> | string) =>
  styled(Component as React.ComponentType<Record<string, unknown>>, {
    shouldForwardProp: (prop) => prop !== 'isScrolled'
  });

export const HeaderContainer = withTransientProps('header')<{ isScrolled: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  z-index: 100;
  width: 100%;
  backdrop-filter: blur(15px);
  background-color: ${props => props.isScrolled ? props.theme.colors.menu : props.theme.colors.background};
  border-bottom: 1px solid ${props => props.theme.colors.border};
  transition: 0.3s;

  ${props => props.isScrolled && css`
    background-color: ${props.theme.colors.menu};
  `}
`;

export const Nav = withTransientProps('nav')<{ isScrolled: boolean }>`
  max-width: 1200px;
  min-height: 64px;
  overflow: hidden;
  margin: 0 auto;
  padding: 1rem;
  text-align: center;
  transition: 0.4s;

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
  `}
`;

export const LogoLink = withTransientProps('a')<{ isScrolled: boolean }>`
  position: relative;
  display: block;
  width: 100%;
  order: 0;
  height: ${props => props.isScrolled ? '32px' : '80px'};

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
    width: auto;
    height: 100%;
    max-height: ${props => props.isScrolled ? '32px' : '80px'};
    transition: 0.5s;

    @media (min-width: ${props => props.theme.breakpoints.md}) {
      max-height: 105px;
      width: 100%;
      height: auto;
    }
  }

  ${props => props.isScrolled && css`
    display: flex;
    width: 100px;
    max-width: 100px;

    @media (min-width: ${props.theme.breakpoints.md}) {
      max-width: 100%;
      width: 100%;
    }

    svg {
      max-height: 43px;

      @media (min-width: ${props.theme.breakpoints.md}) {
        max-height: 40px;
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
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.2rem 0.5rem;
  height: auto;
  width: auto;
  border: 1px solid ${props => props.theme.colors.primary};
  border-radius: 0;
  flex-shrink: 0;
  font-size: 1em;
  color: ${props => props.theme.colors.primary};
  background-color: transparent;
  transform-origin: center;
  will-change: transform;
  transition: all 0.3s ease;

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

  &.whapp, &.insta {
    &:hover {
      transform: scale(1.1) rotate(15deg);
    }
  }

  &.linkedin:hover {
    transform: scale(1.1) rotate(-15deg);
  }

  &:active {
    background-image: linear-gradient(rgb(0 0 0 / 40%) 0 0);
    transform: scale(0.95);
  }
`;
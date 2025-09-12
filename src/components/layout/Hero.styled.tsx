import styled from '@emotion/styled';
import { css, keyframes } from '@emotion/react';

// Style functions to avoid interpolation warnings
const darkVariantStyles = (props: any) => css`
  background-color: hsl(152, 100%, 21%); /* --color-green-1 */

  h1, p {
    color: hsl(0, 0%, 100%);
  }

  .leave {
    filter: invert(51%) sepia(24%) saturate(1122%) hue-rotate(79deg) brightness(96%) contrast(88%);
  }
`;

const isVhStyles = (props: any) => css`
  height: 100%;
  max-height: 100%;
  min-height: calc(100vh - 231px);

  @media (min-width: ${props.theme?.breakpoints?.md || '768px'}) {
    min-height: calc(100vh - 360px);
  }

  @media (min-width: ${props.theme?.breakpoints?.lg || '1024px'}) {
    min-height: calc(100vh - 422px);
  }
`;

const isVhTextStyles = () => css`
  position: relative;
  flex-direction: column;

  p {
    max-width: unset;
  }
`;

const leaveVariantOne = (props: any) => css`
  left: 0px;
  top: -30%;
  rotate: 35deg;
  opacity: 1;
  animation: ${leaveOne} 3s ease-out forwards;
  animation-fill-mode: forwards;
  will-change: transform, opacity;

  @media (min-width: ${props.theme?.breakpoints?.xl || '1280px'}) {
    left: 20px;
    rotate: 80deg;
  }
`;

const leaveVariantTwo = (props: any) => css`
  right: -50px;
  top: -30%;
  rotate: 90deg;
  opacity: 1;
  animation: ${leaveTwo} 2s ease-out forwards;
  animation-fill-mode: forwards;
  animation-delay: 0.2s;
  will-change: transform, opacity;

  @media (min-width: ${props.theme?.breakpoints?.md || '768px'}) {
    right: 0;
  }
`;

const leaveVariantThree = (props: any) => css`
  right: 0;
  bottom: -60%;
  rotate: 260deg;
  opacity: 1;
  animation: ${leaveThree} 3s ease-out forwards;
  animation-fill-mode: forwards;
  animation-delay: 0.4s;
  will-change: transform, opacity;

  @media (min-width: ${props.theme?.breakpoints?.md || '768px'}) {
    right: 20px;
  }

  @media (min-width: ${props.theme?.breakpoints?.lg || '1024px'}) {
    right: 50px;
    rotate: 320deg;
  }
`;

const leaveVariantFour = (props: any) => css`
  left: -10px;
  bottom: -50%;
  rotate: 280deg;
  opacity: 1;
  animation: ${leaveFour} 2s ease-out forwards;
  animation-fill-mode: forwards;
  animation-delay: 0.6s;
  will-change: transform, opacity;

  @media (min-width: ${props.theme?.breakpoints?.md || '768px'}) {
    left: 5px;
  }

  @media (min-width: ${props.theme?.breakpoints?.xl || '1280px'}) {
    left: 30px;
  }
`;

// Keyframes
const textShine = keyframes`
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 200% 50%;
  }
`;

const leaveOne = keyframes`
  0% { 
    transform: rotate(40deg); 
    top: -30%;
  } 
  100% { 
    top: -20%;
    transform: rotate(45deg); 
  } 
`;

const leaveTwo = keyframes`
  0% { 
    transform: rotate(0deg); 
    top: -30%;
  } 
  50% {
    transform: rotate(10deg);
  }
  100% { 
    top: -17%;
    transform: rotate(5deg); 
  } 
`;

const leaveThree = keyframes`
  0% { 
    transform: rotate(0deg); 
    bottom: -60%;
  } 
  100% { 
    bottom: -22%;
    transform: rotate(5deg); 
  } 
`;

const leaveFour = keyframes`
  0% { 
    transform: rotate(0deg); 
    bottom: -50%;
  } 
  50% {
    transform: rotate(10deg);
  }
  100% { 
    bottom: -20%;
    transform: rotate(5deg); 
  } 
`;

export const HeroContainer = styled.section<{ $theme?: 'dark' | 'light'; isVh?: boolean; isHomePage?: boolean }>`
  position: relative;
  width: 100%;
  max-width: 100%;
  height: 380px;
  max-height: 380px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  overflow: hidden;
  padding: 117px 0 0 0;
  margin: 0;

  @media (min-width: ${props => props.theme?.breakpoints?.md || '768px'}) {
    padding-top: 154px;
    height: 600px;
    max-height: 600px;
  }

  img[alt="404"] {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  ${props => props.$theme === 'dark' && darkVariantStyles(props)}

  ${props => props.isVh && isVhStyles(props)}
  
  /* Apply dark overlay for homepage in dark mode using data attribute */
  ${props => props.isHomePage && css`
    [data-theme="dark"] & {
      &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #1a1a1ae6;
        z-index: 1;
        pointer-events: none;
      }
    }
  `}
`;

export const HeroContainer2 = styled.div<{ isHomePage?: boolean; isDarkMode?: boolean }>`
  position: relative;
  height: 100%;
  
  /* Apply dark overlay for homepage */
  ${props => props.isHomePage && css`
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: transparent;
      z-index: 1;
      pointer-events: none;
      transition: background-color 0.3s ease;
    }
  `}
  
  /* Dark mode overlay */
  ${props => props.isHomePage && props.isDarkMode && css`
    &::before {
      background-color: #1a1a1ae6;
    }
  `}
`;

export const HeroText = styled.header<{ isVh?: boolean; isHomePage?: boolean }>`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  text-align: center;
  padding: 1rem;
  z-index: 10;

  h1 {
    color: hsl(0, 0%, 100%) !important;
  }

  p {
    font-family: var(--font-pacaembu);
    line-height: 1.4;
    max-width: 650px;
    margin: 0 auto;
    
    @media (min-width: ${props => props.theme?.breakpoints?.md || '768px'}) {
      font-size: 1.2rem;
      max-width: 650px;
      line-height: 1.4;
    }
  }

  ${props => props.isVh && isVhTextStyles()}
`;

export const HeroImages = styled.div`
  position: relative;
  height: 100%;
  user-select: none;
  z-index: 2;
`;

export const HomePageTitle = styled.h1`
  font-size: 1.5rem !important;
  font-weight: 700;
  background: linear-gradient(
    90deg,
    hsl(130, 47%, 42%) 0%,
    hsl(152, 100%, 21%) 50%,
    hsl(130, 47%, 42%) 100%
  );
  background-size: 200% auto;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: ${textShine} 3s linear infinite;
  letter-spacing: 0.02em;
  margin-bottom: 1.5rem;
  
  @media (min-width: ${props => props.theme?.breakpoints?.md || '768px'}) {
    font-size: 3rem !important;
  }
  
  @media (min-width: ${props => props.theme?.breakpoints?.lg || '1024px'}) {
    font-size: 4rem !important;
  }
`;

export const LeaveImage = styled.div<{ variant: 'one' | 'two' | 'three' | 'four' }>`
  position: absolute;
  max-width: 130px;

  @media (min-width: ${props => props.theme?.breakpoints?.md || '768px'}) {
    max-width: 220px;
  }

  @media (min-width: ${props => props.theme?.breakpoints?.xl || '1280px'}) {
    max-width: 260px;
  }

  ${props => props.variant === 'one' && leaveVariantOne(props)}

  ${props => props.variant === 'two' && leaveVariantTwo(props)}

  ${props => props.variant === 'three' && leaveVariantThree(props)}

  ${props => props.variant === 'four' && leaveVariantFour(props)}
`;

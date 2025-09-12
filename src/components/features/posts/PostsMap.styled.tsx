import styled from '@emotion/styled';
import { css, keyframes } from '@emotion/react';

// Helper to filter out motion props from DOM elements
const filterMotionProps = (props: string[]) => (prop: string) => 
  !props.includes(prop) && 
  !['whileHover', 'whileTap', 'transition', 'animate', 'initial', 'exit', 'variants', 'layout'].includes(prop);

// Wave animation
const moveWave = keyframes`
  100% { 
    transform: translateX(-100%);
  }
`;

export const BlogGrid = styled('div', {
  shouldForwardProp: filterMotionProps([])
})`
  position: relative;
  display: grid;
  gap: 1.3rem;
  margin-top: 1.2rem;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    overflow: auto hidden;

    > div {
      flex: 0 0 65vw;
    }
  }

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    margin-top: 2rem;
  }

  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    grid-template-columns: repeat(3, 1fr);
  }

  &:empty {
    display: flex;
    justify-content: center;
    border: 1px solid ${props => props.theme.colors.border};
    border-radius: 5px;
    padding: 1rem;

    &::after {
      content: "Sorry... Ik heb geen artikel geschreven met deze titel";
    }
  }
`;

export const EmptyState = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${props => props.theme.spacing.xl};
  text-align: center;
  color: ${props => props.theme.colors.textSecondary};
  
  p {
    font-size: ${props => props.theme.typography.fontSize.lg};
  }
`;

export const BlogButtonSection = styled.section`
  display: flex;
  justify-content: center;
  margin-top: 2rem;

  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    margin-top: 4rem;
  }
`;

export const LoadMoreButtonStyled = styled('button', {
  shouldForwardProp: filterMotionProps([])
})`
  position: relative;
  display: block;
  height: 48px;
  border-radius: 40px;
  background-color: ${props => props.theme.colors.secondary};
  color: ${props => props.theme.colors.secondary} !important;
  overflow: hidden;
  border: 1px solid ${props => props.theme.colors.secondary};

  &:hover {
    background-color: ${props => props.theme.colors.secondary};
    border-color: ${props => props.theme.colors.secondary};
    color: ${props => props.theme.colors.background} !important;
    
    span {
      color: ${props => props.theme.colors.background} !important;
    }

    .wave {
      top: -120px;
    }
  }

  span {
    position: relative;
    font-family: var(--font-pacaembu);
    z-index: 1;
    color: ${props => props.theme.colors.textSecondary} !important;
  }
`;

export const Wave = styled.div`
  width: 12.5%;
  height: 100%;
  background: ${props => props.theme.colors.background};
  position: absolute;
  left: 0;
  top: -7px;
  transition: 0.4s;
  animation: ${moveWave} 3s linear infinite;

  &:before,
  &:after {
    content: "";
    display: block;
    position: absolute;
    border-radius: 100%;
    width: 100%;
    height: 50px;
  }

  &:before {
    background-color: ${props => props.theme.colors.secondary};
    right: -24%;
    top: 42px;
  }

  &:after {
    background-color: ${props => props.theme.colors.background};
    left: -26%;
    top: -1.4px;
  }

  &:nth-of-type(2) {
    left: 0%;
  }

  &:nth-of-type(3) {
    left: 12.5%;
  }

  &:nth-of-type(4) {
    left: 25%;
  }

  &:nth-of-type(5) {
    left: 37.5%;
  }

  &:nth-of-type(6) {
    left: 50%;
  }

  &:nth-of-type(7) {
    left: 62.5%;
  }

  &:nth-of-type(8) {
    left: 75%;
  }

  &:nth-of-type(9) {
    left: 87.5%;
  }

  &:nth-of-type(10) {
    left: 100%;
  }
`;

export const MorePosts = styled.div`
  position: relative;
  width: 100%;
  margin-top: 1rem;

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    margin-top: 3rem;
  }

  ${BlogGrid} {
    @media (max-width: ${props => props.theme.breakpoints.sm}) {
      display: flex;
    }

    @media only screen and (max-width: 1299px) and (min-width: 767px) {
      grid-template-columns: 1fr 1fr;
    }

    article {
      height: calc(100% - 2px);
    }

    > div {
      box-shadow: none;
      flex: 0 0 65vw;

      @media only screen and (max-width: 1299px) and (min-width: 767px) {
        &:nth-child(3) {
          display: none;
        }
      }

      div:first-of-type {
        height: 170px;
      }

      div:last-of-type {
        padding: 1rem;

        h2 {
          font-size: 1.2em;
        }
      }
    }
  }
`;
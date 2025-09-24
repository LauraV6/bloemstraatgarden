import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

const loadIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const TitleLineHeading = styled.h4`
  display: none;
  position: relative;
  text-align: center;
  overflow: hidden;
  font-size: 1.1em;
  text-transform: uppercase;
  margin-bottom: 1.5rem;
  color: ${props => props.theme.colors.text};

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    display: block;
    margin-bottom: 3rem;
  }

  > span {
    position: relative;
    font-weight: 500;
    animation: ${loadIn} 1s forwards;

    &::before, 
    &::after {
      content: "";
      border-top: 1px solid ${props => props.theme.colors.text === 'hsl(220, 38%, 11%)' 
        ? 'hsl(105, 29%, 84%)' 
        : props.theme.colors.textMuted};
      height: 1px;
      position: absolute;
      right: -620px;
      bottom: 5px;
      width: 600px;
    }

    &::before {
      left: -620px;
      right: auto;
    }
  }
`;
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

const popIn = keyframes`
  0% {
    transform: scale(0);
    opacity: 0;
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

export const CartIconButton = styled.button`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: ${props => props.theme.colors.primary || 'hsl(130, 47%, 42%)'};
  color: hsl(0, 0%, 100%);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  padding: 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
  z-index: 100;

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    bottom: 3rem;
    right: 3rem;
    width: 70px;
    height: 70px;
    font-size: 1.75rem;
  }

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
    background-color: ${props => props.theme.colors.primaryDark};
  }

  &:active {
    transform: scale(0.95);
  }

  * {
    color: hsl(0, 0%, 100%);
  }
`;

export const CartBadge = styled.span`
  position: absolute;
  top: -5px;
  right: -5px;
  background-color: ${props => props.theme.colors.secondary};
  color: hsl(0, 0%, 100%);
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 700;
  border: 2px solid hsl(0, 0%, 100%);
  animation: ${popIn} 0.3s ease;

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    width: 28px;
    height: 28px;
    font-size: 0.875rem;
  }
`;
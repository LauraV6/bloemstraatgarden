import styled from '@emotion/styled';
import { keyframes, css } from '@emotion/react';

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const ThemeSwitch = styled.button`
  line-height: 1;
  padding: 0.5rem 1rem;
  margin-left: auto;
  color: ${props => props.theme.colors.primary};
  transition: all 0.3s ease;
  border-radius: 40px;
  border: 1px solid ${props => props.theme.colors.primary};
  background-color: transparent;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.9rem;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    position: absolute;
    right: 1rem;
    top: 1rem;
  }

  &:hover {
    background-color: ${props => props.theme.colors.primary};
    color: white !important;

    span {
      color: white !important;
    }

    svg {
      color: white !important;
      
      path {
        fill: white !important;
      }
    }
  }
`;

export const Skeleton = styled.span`
  display: flex;
  gap: 10px;
  align-items: center;
`;

export const ThemeIcon = styled.span<{ $isLoading?: boolean }>`
  ${props => props.$isLoading && css`
    animation: ${spin} 1s linear infinite;
  `}
`;

export const ThemeLabel = styled.span`
  color: inherit;
  font-size: 0.9rem;
`;

export const SkeletonText = styled.span`
  opacity: 0.7;
`;
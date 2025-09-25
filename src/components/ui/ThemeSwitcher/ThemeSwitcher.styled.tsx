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
  gap: 0.4rem;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    position: absolute;
    right: 1rem;
    top: 1rem;
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
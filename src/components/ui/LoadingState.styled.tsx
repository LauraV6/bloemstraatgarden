import styled from '@emotion/styled';
import { keyframes, css } from '@emotion/react';

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 1rem;
  min-height: 200px;
`;

export const FullPageWrapper = styled.div`
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Spinner = styled.div`
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
`;

export const SpinnerRing = styled.div<{ delay?: number }>`
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 64px;
  height: 64px;
  margin: 8px;
  border: 4px solid;
  border-radius: 50%;
  animation: ${spin} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: var(--color-primary) transparent transparent transparent;

  ${props => props.delay && css`animation-delay: ${props.delay}s;`}
`;

export const LoadingMessage = styled.p`
  margin-top: 1rem;
  font-size: 1rem;
  font-weight: 500;
  text-align: center;
`;
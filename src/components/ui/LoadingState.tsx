'use client';

import React from 'react';
import { LoadingContainer, FullPageWrapper, Spinner, SpinnerRing, LoadingMessage } from './LoadingState.styled';

interface LoadingStateProps {
  message?: string;
  fullPage?: boolean;
}

export default function LoadingState({ message = 'Laden...', fullPage = false }: LoadingStateProps) {
  const content = (
    <LoadingContainer>
      <Spinner>
        <SpinnerRing delay={-0.45} />
        <SpinnerRing delay={-0.3} />
        <SpinnerRing delay={-0.15} />
        <SpinnerRing />
      </Spinner>
      <LoadingMessage>{message}</LoadingMessage>
    </LoadingContainer>
  );

  if (fullPage) {
    return <FullPageWrapper>{content}</FullPageWrapper>;
  }

  return content;
}
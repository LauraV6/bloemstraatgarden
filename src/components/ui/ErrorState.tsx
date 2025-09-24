'use client';

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle, faRefresh } from '@fortawesome/free-solid-svg-icons';
import { ErrorContainer, ErrorIcon, ErrorMessage, RetryButton, FullPageWrapper } from './ErrorState.styled';

interface ErrorStateProps {
  error?: Error | { message: string } | string;
  onRetry?: () => void;
  fullPage?: boolean;
}

export default function ErrorState({ error, onRetry, fullPage = false }: ErrorStateProps) {
  const errorMessage = typeof error === 'string'
    ? error
    : error?.message || 'Er is een fout opgetreden bij het laden van de gegevens.';

  const content = (
    <ErrorContainer>
      <div>
        <ErrorIcon>
          <FontAwesomeIcon icon={faExclamationTriangle} />
        </ErrorIcon>
        <h2>Oeps! Er ging iets mis</h2>
        <ErrorMessage>{errorMessage}</ErrorMessage>
        {onRetry && (
          <RetryButton
            onClick={onRetry}
            className="button button--cta"
            aria-label="Opnieuw proberen"
          >
            <FontAwesomeIcon icon={faRefresh} className="retry-icon" />
            <span>Opnieuw proberen</span>
          </RetryButton>
        )}
      </div>
    </ErrorContainer>
  );

  if (fullPage) {
    return <FullPageWrapper>{content}</FullPageWrapper>;
  }

  return content;
}
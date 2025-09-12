'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { ErrorContainer, ErrorContent, ErrorDetails, StackTrace, ErrorActions, RetryButton, HomeLink } from './error.styled';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error);
  }, [error]);

  return (
    <ErrorContainer>
      <ErrorContent>
        <h1>😔 Er is iets misgegaan</h1>
        <p>We hebben een onverwachte fout ondervonden. Onze excuses voor het ongemak.</p>
        
        {process.env.NODE_ENV === 'development' && error.message && (
          <ErrorDetails>
            <summary>Fout details (alleen zichtbaar in development)</summary>
            <pre>{error.message}</pre>
            {error.stack && (
              <StackTrace>{error.stack}</StackTrace>
            )}
          </ErrorDetails>
        )}
        
        <ErrorActions>
          <RetryButton
            onClick={reset}
            aria-label="Probeer opnieuw"
          >
            Probeer opnieuw
          </RetryButton>
          
          <Link 
            href="/" 
            passHref
            legacyBehavior
          >
            <HomeLink aria-label="Ga terug naar de homepage">
              Terug naar homepage
            </HomeLink>
          </Link>
        </ErrorActions>
      </ErrorContent>
    </ErrorContainer>
  );
}
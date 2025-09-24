'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { ErrorContainer, ErrorContent, ErrorDetails, StackTrace, ErrorActions } from './error.styled';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
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
            <StackTrace>{error.message}</StackTrace>
            {error.stack && (
              <StackTrace>{error.stack}</StackTrace>
            )}
          </ErrorDetails>
        )}
        
        <ErrorActions>
          <button
            onClick={reset}
            aria-label="Probeer opnieuw"
          >
            Probeer opnieuw
          </button>
          
          <Link 
            href="/" 
            passHref
            legacyBehavior
          >
            <button aria-label="Ga terug naar de homepage">
              Terug naar homepage
            </button>
          </Link>
        </ErrorActions>
      </ErrorContent>
    </ErrorContainer>
  );
}
'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import styles from './error.module.scss';

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
    <div className={styles.errorContainer}>
      <div className={styles.errorContent}>
        <h1>😔 Er is iets misgegaan</h1>
        <p>We hebben een onverwachte fout ondervonden. Onze excuses voor het ongemak.</p>
        
        {process.env.NODE_ENV === 'development' && error.message && (
          <details className={styles.errorDetails}>
            <summary>Fout details (alleen zichtbaar in development)</summary>
            <pre>{error.message}</pre>
            {error.stack && (
              <pre className={styles.stackTrace}>{error.stack}</pre>
            )}
          </details>
        )}
        
        <div className={styles.errorActions}>
          <button
            onClick={reset}
            className={styles.retryButton}
            aria-label="Probeer opnieuw"
          >
            Probeer opnieuw
          </button>
          
          <Link 
            href="/" 
            className={styles.homeLink}
            aria-label="Ga terug naar de homepage"
          >
            Terug naar homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
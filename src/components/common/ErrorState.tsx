import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle, faRefresh } from '@fortawesome/free-solid-svg-icons';
import styles from './ErrorState.module.scss';

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
    <div className={styles.errorContainer}>
      <FontAwesomeIcon 
        icon={faExclamationTriangle} 
        className={styles.errorIcon}
      />
      <h2>Oeps! Er ging iets mis</h2>
      <p className={styles.errorMessage}>{errorMessage}</p>
      {onRetry && (
        <button 
          onClick={onRetry}
          className={"button button--cta" + ' ' + styles.retryButton}
          aria-label="Opnieuw proberen"
        >
          <FontAwesomeIcon icon={faRefresh} className={styles.retryIcon} />
          Opnieuw proberen
        </button>
      )}
    </div>
  );

  if (fullPage) {
    return <div className={styles.fullPageWrapper}>{content}</div>;
  }

  return content;
}
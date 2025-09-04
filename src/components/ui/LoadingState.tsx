import React from 'react';
import styles from './LoadingState.module.scss';

interface LoadingStateProps {
  message?: string;
  fullPage?: boolean;
}

export default function LoadingState({ message = 'Laden...', fullPage = false }: LoadingStateProps) {
  const content = (
    <div className={styles.loadingContainer}>
      <div className={styles.spinner}>
        <div className={styles.spinnerRing}></div>
        <div className={styles.spinnerRing}></div>
        <div className={styles.spinnerRing}></div>
        <div className={styles.spinnerRing}></div>
      </div>
      <p className={styles.loadingMessage}>{message}</p>
    </div>
  );

  if (fullPage) {
    return <div className={styles.fullPageWrapper}>{content}</div>;
  }

  return content;
}
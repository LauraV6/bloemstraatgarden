'use client';

import { useAvailableItems } from '@/hooks/useContentful';
import LoadingState from '@/components/ui/LoadingState';
import ErrorState from '@/components/ui/ErrorState';
import AvailableCard from './AvailableCard';
import styles from './available.module.scss';

export default function AvailableApollo() {
  const { items, loading, error } = useAvailableItems();

  if (loading) {
    return <LoadingState message="Beschikbare planten laden..." />;
  }

  if (error) {
    return (
      <ErrorState 
        error={error}
        onRetry={() => window.location.reload()}
      />
    );
  }

  if (!items || items.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p>Op dit moment zijn er geen planten beschikbaar.</p>
        <p>Check regelmatig terug voor updates!</p>
      </div>
    );
  }

  return (
    <div className={styles.availableGrid}>
      {items.map((item: any, index: number) => (
        <AvailableCard key={item.sys.id} item={item} index={index} />
      ))}
    </div>
  );
}
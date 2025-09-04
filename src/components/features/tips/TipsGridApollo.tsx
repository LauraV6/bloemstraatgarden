'use client';

import { useTips } from '@/hooks/useContentful';
import { TipCard } from './TipCard';
import LoadingState from '@/components/common/LoadingState';
import ErrorState from '@/components/common/ErrorState';
import styles from './tipsGrid.module.scss';

export default function TipsGridApollo() {
  const { tips, loading, error } = useTips(5);

  if (loading) {
    return <LoadingState message="Tips laden..." />;
  }

  if (error) {
    return (
      <ErrorState 
        error={error}
        onRetry={() => window.location.reload()}
      />
    );
  }

  if (!tips || tips.length === 0) {
    return (
      <div className="tips-empty" role="status">
        <p>Geen tips beschikbaar op dit moment.</p>
      </div>
    );
  }

  return (
    <div className={styles.tipsGrid}>
      {tips.map((tip: any) => (
        <TipCard key={tip.sys.id} props={tip} />
      ))}
    </div>
  );
}
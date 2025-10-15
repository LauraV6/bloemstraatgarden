'use client';

import { useTipsWithFallback } from '@/hooks/useContentfulWithFallback';
import { TipCard } from './TipCard';
import TipCardSkeleton from './TipCardSkeleton';
import ErrorState from '@/components/ui/ErrorState';
import { TipsGridContainer } from './TipsGrid.styled';
import type { Tip } from '@/types/contentful';

export default function TipsGridApollo() {
  const { tips, loading, error, source } = useTipsWithFallback(5);

  if (loading) {
    return <TipCardSkeleton amount={5} />;
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
        {source && <small style={{ opacity: 0.7 }}>Data source: {source}</small>}
      </div>
    );
  }

  return (
    <TipsGridContainer>
      {tips.map((tip: Tip) => (
        <TipCard key={tip.sys.id} props={tip} />
      ))}
    </TipsGridContainer>
  );
}
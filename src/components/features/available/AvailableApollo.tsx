'use client';

import { useAvailableItems } from '@/hooks/useContentful';
import LoadingState from '@/components/ui/LoadingState';
import ErrorState from '@/components/ui/ErrorState';
import AvailableCard from './AvailableCard';
import styled from '@emotion/styled';

const EmptyState = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xxl};
  color: ${({ theme }) => theme.colors.textSecondary};
  
  p {
    margin-bottom: ${({ theme }) => theme.spacing.sm};
    font-size: ${({ theme }) => theme.typography.fontSize.lg};
  }
`;

const AvailableGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
  padding: 2rem;
  background-color: ${({ theme }) => theme.colors.green5};
  border-radius: 8px;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    padding: 1.5rem;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 2.5rem;
  }
`;

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
      <EmptyState>
        <p>Op dit moment zijn er geen planten beschikbaar.</p>
        <p>Check regelmatig terug voor updates!</p>
      </EmptyState>
    );
  }

  return (
    <AvailableGrid>
      {items.map((item: any, index: number) => (
        <AvailableCard key={item.sys.id} item={item} index={index} />
      ))}
    </AvailableGrid>
  );
}
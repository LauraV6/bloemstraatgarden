'use client';

import { useArticlesWithFallback } from '@/hooks/useContentfulWithFallback';
import PostsMap from './PostsMap';
import PostCardSkeleton from './PostCardSkeleton';
import ErrorState from '@/components/ui/ErrorState';

interface PostsGridClientProps {
  className?: string;
  limit?: number;
}

export default function PostsGridClient({ 
  className,
  limit = 10
}: PostsGridClientProps) {
  const { articles, loading, error, source } = useArticlesWithFallback(limit);

  if (loading) {
    return <PostCardSkeleton amount={3} />;
  }

  if (error) {
    return (
      <ErrorState 
        error={error}
        onRetry={() => window.location.reload()}
      />
    );
  }

  if (!articles || articles.length === 0) {
    return (
      <div className="posts-empty" role="status">
        <p>Geen artikelen beschikbaar op dit moment.</p>
        {source && <small style={{ opacity: 0.7 }}>Data source: {source}</small>}
      </div>
    );
  }

  return (
    <PostsMap 
      articles={articles} 
      className={className}
    />
  );
}
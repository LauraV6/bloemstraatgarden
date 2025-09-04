'use client';

import { useArticles } from '@/hooks/useContentful';
import PostsMap from './PostsMap';
import LoadingState from '@/components/ui/LoadingState';
import ErrorState from '@/components/ui/ErrorState';

interface PostsGridClientProps {
  className?: string;
  limit?: number;
}

export default function PostsGridClient({ 
  className,
  limit = 10
}: PostsGridClientProps) {
  const { articles, loading, error } = useArticles(limit);

  if (loading) {
    return <LoadingState message="Blog artikelen laden..." />;
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
'use client';

import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client/react';
import { 
  GET_ALL_ARTICLES, 
  GET_ALL_TIPS,
} from '@/lib/api/graphql/queries';
import { fetchArticles, fetchTips } from '@/lib/api/contentful/client-cdn';
import { mockArticles, mockTips } from '@/lib/api/contentful/mock-data';
import type {
  ArticleCollection,
  TipCollection,
} from '@/lib/api/graphql/types';
import type { Article, Tip } from '@/types/contentful';

interface FallbackData<T> {
  items: T[];
  total: number;
}

export function useArticlesWithFallback(limit: number = 10, skip: number = 0) {
  const [cdnData, setCdnData] = useState<FallbackData<Article> | null>(null);
  const [cdnLoading, setCdnLoading] = useState(false);
  const [cdnError, setCdnError] = useState<Error | null>(null);
  
  // Try GraphQL first
  const { data: graphqlData, loading: graphqlLoading, error: graphqlError } = useQuery<ArticleCollection>(
    GET_ALL_ARTICLES,
    {
      variables: { limit, skip },
      errorPolicy: 'ignore', // Don't throw, we'll handle it
    }
  );
  
  // Use CDN as fallback if GraphQL fails
  useEffect(() => {
    if (graphqlError && !graphqlData) {
      // GraphQL failed, falling back to CDN API for articles
      setCdnLoading(true);
      
      fetchArticles(limit, skip)
        .then((data) => {
          setCdnData(data);
          setCdnError(null);
        })
        .catch(() => {
          // CDN API also failed, using mock data for development
          // Use mock data as last resort
          setCdnData({
            items: mockArticles.slice(skip, skip + limit),
            total: mockArticles.length
          });
          setCdnError(null);
        })
        .finally(() => {
          setCdnLoading(false);
        });
    }
  }, [graphqlError, graphqlData, limit, skip]);
  
  // Determine which data source to use
  const isLoading = graphqlLoading || cdnLoading;
  const error = (!graphqlData && graphqlError) ? (cdnError || graphqlError) : null;
  const articles = graphqlData?.knowledgeArticleCollection?.items || cdnData?.items || [];
  const total = graphqlData?.knowledgeArticleCollection?.total || cdnData?.total || 0;
  
  return {
    articles,
    total,
    loading: isLoading,
    error,
    source: graphqlData ? 'graphql' : cdnData ? (cdnData.items === mockArticles.slice(skip, skip + limit) ? 'mock' : 'cdn') : null
  };
}

export function useTipsWithFallback(limit: number = 5, skip: number = 0) {
  const [cdnData, setCdnData] = useState<FallbackData<Tip> | null>(null);
  const [cdnLoading, setCdnLoading] = useState(false);
  const [cdnError, setCdnError] = useState<Error | null>(null);
  
  // Try GraphQL first
  const { data: graphqlData, loading: graphqlLoading, error: graphqlError } = useQuery<TipCollection>(
    GET_ALL_TIPS,
    {
      variables: { limit, skip },
      errorPolicy: 'ignore', // Don't throw, we'll handle it
    }
  );
  
  // Use CDN as fallback if GraphQL fails
  useEffect(() => {
    if (graphqlError && !graphqlData) {
      // GraphQL failed, falling back to CDN API for tips
      setCdnLoading(true);
      
      fetchTips(limit, skip)
        .then((data) => {
          setCdnData(data);
          setCdnError(null);
        })
        .catch(() => {
          // CDN API also failed, using mock data for development
          // Use mock data as last resort
          setCdnData({
            items: mockTips.slice(skip, skip + limit),
            total: mockTips.length
          });
          setCdnError(null);
        })
        .finally(() => {
          setCdnLoading(false);
        });
    }
  }, [graphqlError, graphqlData, limit, skip]);
  
  // Determine which data source to use
  const isLoading = graphqlLoading || cdnLoading;
  const error = (!graphqlData && graphqlError) ? (cdnError || graphqlError) : null;
  const tips = graphqlData?.tipsCollection?.items || cdnData?.items || [];
  const total = graphqlData?.tipsCollection?.total || cdnData?.total || 0;
  
  return {
    tips,
    total,
    loading: isLoading,
    error,
    source: graphqlData ? 'graphql' : cdnData ? (cdnData.items === mockTips.slice(skip, skip + limit) ? 'mock' : 'cdn') : null
  };
}
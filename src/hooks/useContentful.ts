'use client';

import { useQuery, useLazyQuery } from '@apollo/client/react';
import { 
  GET_ALL_ARTICLES, 
  GET_ARTICLE_BY_SLUG,
  GET_ALL_TIPS,
  GET_TIP_BY_SLUG,
  GET_AVAILABLE_ITEMS
} from '@/lib/api/graphql/queries';
import type { 
  ArticleCollection, 
  TipCollection, 
  AvailableCollection 
} from '@/lib/api/graphql/types';
import type { Article, Tip } from '@/types/contentful';

export function useArticles(limit: number = 10, skip: number = 0) {
  const { data, loading, error, fetchMore } = useQuery<ArticleCollection>(GET_ALL_ARTICLES, {
    variables: { limit, skip },
  });

  return {
    articles: data?.knowledgeArticleCollection?.items || [],
    total: data?.knowledgeArticleCollection?.total || 0,
    loading,
    error,
    fetchMore,
  };
}

export function useArticleBySlug(slug: string) {
  const { data, loading, error } = useQuery<ArticleCollection>(GET_ARTICLE_BY_SLUG, {
    variables: { slug },
    skip: !slug,
  });

  return {
    article: data?.knowledgeArticleCollection?.items?.[0] || null,
    loading,
    error,
  };
}

export function useTips(limit: number = 10, skip: number = 0) {
  const { data, loading, error, fetchMore } = useQuery<TipCollection>(GET_ALL_TIPS, {
    variables: { limit, skip },
  });

  return {
    tips: data?.tipsCollection?.items || [],
    total: data?.tipsCollection?.total || 0,
    loading,
    error,
    fetchMore,
  };
}

export function useTipBySlug(slug: string) {
  const { data, loading, error } = useQuery<TipCollection>(GET_TIP_BY_SLUG, {
    variables: { slug },
    skip: !slug,
  });

  return {
    tip: data?.tipsCollection?.items?.[0] || null,
    loading,
    error,
  };
}

export function useAvailableItems() {
  const { data, loading, error } = useQuery<AvailableCollection>(GET_AVAILABLE_ITEMS);

  return {
    items: data?.verkrijgbaarCollection?.items || [],
    loading,
    error,
  };
}

export function useLazyArticles() {
  const [getArticles, { data, loading, error }] = useLazyQuery<ArticleCollection>(GET_ALL_ARTICLES);
  
  return {
    getArticles,
    articles: data?.knowledgeArticleCollection?.items || [],
    total: data?.knowledgeArticleCollection?.total || 0,
    loading,
    error,
  };
}
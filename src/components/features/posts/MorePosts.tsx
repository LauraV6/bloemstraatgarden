"use client";

import { Suspense, useMemo } from "react";
import { PostCard } from "./PostCard";
import PostCardSkeleton from "./PostCardSkeleton";
import FadeIn from "@/components/ui/FadeIn";
import { shuffle } from "@/utils/Shuffle";
import styled from '@emotion/styled';

const MorePostsContainer = styled.div`
  position: relative;
  width: 100%;
  margin-top: 1rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-top: 3rem;
  }
  
  h3 {
    font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
    margin-bottom: ${({ theme }) => theme.spacing.lg};
    color: ${({ theme }) => theme.colors.text};
    font-family: ${({ theme }) => theme.typography.fontFamilyHeading};
  }
`;

const BlogGrid = styled.div`
  position: relative;
  display: grid;
  gap: 1.3rem;
  margin-top: 1.2rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    display: flex;
    overflow: auto hidden;

    > div {
      flex: 0 0 65vw;
    }
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    margin-top: 2rem;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media only screen and (max-width: 1299px) and (min-width: 767px) {
    grid-template-columns: 1fr 1fr;
    
    > div:nth-of-type(3) {
      display: none;
    }
  }

  article {
    height: calc(100% - 2px);
  }

  > div {
    box-shadow: none;
    
    @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
      flex: 0 0 65vw;
    }

    div:first-of-type {
      height: 170px;
    }

    div:last-of-type {
      padding: 1rem;

      h2 {
        font-size: 1.2em;
      }
    }
  }
`;

// Types
interface ArticleImage {
  url: string;
  title?: string;
}

interface Article {
  sys: {
    id: string;
  };
  slug: string;
  title: string;
  date: string;
  summary: string;
  articleImage: ArticleImage;
}

interface MorePostsProps {
  title: string;
  slug: string;
  articles: Article[];
  url?: string;
  maxPosts?: number;
  className?: string;
}

// Constants
const DEFAULT_CONFIG = {
  maxPosts: 3,
  skeletonCount: 3
} as const;

// Utility functions
const filterAndShufflePosts = (
  articles: Article[], 
  currentSlug: string, 
  maxPosts: number
): Article[] => {
  const filteredPosts = articles.filter(post => post.slug !== currentSlug);
  return shuffle([...filteredPosts]).slice(0, maxPosts);
};

// Components
interface PostsGridProps {
  posts: Article[];
  url?: string;
}

const PostsGrid: React.FC<PostsGridProps> = ({ posts, url }) => (
  <>
    {posts.map((post, index) => (
      <FadeIn key={post.sys.id}>
        <PostCard 
          props={post} 
          url={url} 
          priority={false}
        />
      </FadeIn>
    ))}
  </>
);

const PostsGridSkeleton: React.FC<{ count: number }> = ({ count }) => (
  <BlogGrid>
    <PostCardSkeleton amount={count} />
  </BlogGrid>
);

export const MorePosts: React.FC<MorePostsProps> = ({ 
  title, 
  slug, 
  articles, 
  url,
  maxPosts = DEFAULT_CONFIG.maxPosts,
  className 
}) => {
  // Memoize the filtered and shuffled posts to prevent unnecessary recalculations
  const shuffledPosts = useMemo(() => {
    if (!articles || articles.length === 0) return [];
    return filterAndShufflePosts(articles, slug, maxPosts);
  }, [articles, slug, maxPosts]);

  // Don't render if no posts available
  if (!shuffledPosts.length) {
    return null;
  }

  return (
    <MorePostsContainer aria-labelledby="more-posts-heading">
      <h3 id="more-posts-heading">{title}</h3>
      
      <BlogGrid>
        <Suspense fallback={<PostsGridSkeleton count={maxPosts} />}>
          <PostsGrid posts={shuffledPosts} url={url} />
        </Suspense>
      </BlogGrid>
    </MorePostsContainer>
  );
};
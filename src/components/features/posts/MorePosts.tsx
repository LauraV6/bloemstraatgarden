"use client";

import { Suspense, useMemo } from "react";
import { PostCard } from "./PostCard";
import PostCardSkeleton from "./PostCardSkeleton";
import FadeIn from "@/components/common/FadeIn";
import { shuffle } from "@/utils/Shuffle";
import styles from "./postsMap.module.scss";

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
  <div className={styles.blogGrid}>
    <PostCardSkeleton amount={count} />
  </div>
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
    <div 
      className={styles.morePosts}
      aria-labelledby="more-posts-heading"
    >
      <h3 id="more-posts-heading">{title}</h3>
      
      <div className={styles.blogGrid}>
        <Suspense fallback={<PostsGridSkeleton count={maxPosts} />}>
          <PostsGrid posts={shuffledPosts} url={url} />
        </Suspense>
      </div>
    </div>
  );
};
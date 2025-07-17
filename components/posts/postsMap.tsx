"use client";

import { useState, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import { PostCard } from "./postCard";
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

interface PostsMapProps {
  articles: Article[];
  className?: string;
  initialPostCount?: number;
  loadMoreIncrement?: number;
  url?: string;
}

// Constants
const DEFAULT_CONFIG = {
  initialPostCount: 6,
  loadMoreIncrement: 6,
  waveAmount: 9,
  buttonText: "Geef water voor meer berichten",
  animationDuration: 0.3
} as const;

// Components
interface LoadMoreButtonProps {
  onClick: () => void;
  waveAmount: number;
  buttonText: string;
}

const LoadMoreButton: React.FC<LoadMoreButtonProps> = ({ 
  onClick, 
  waveAmount, 
  buttonText 
}) => (
  <motion.button
    onClick={onClick}
    whileHover={{ scale: [null, 1.1, 1.05] }}
    transition={{ duration: DEFAULT_CONFIG.animationDuration }}
    className={styles.loadMoreButton}
    aria-label={`${buttonText} - Laad meer artikelen`}
  >
    <span>{buttonText}</span>
    {Array.from({ length: waveAmount }, (_, index) => (
      <div className={styles.wave} key={`wave-${index}`} aria-hidden="true" />
    ))}
  </motion.button>
);

interface PostsGridDisplayProps {
  articles: Article[];
  postCount: number;
  url?: string;
}

const PostsGridDisplay: React.FC<PostsGridDisplayProps> = ({ 
  articles, 
  postCount, 
  url 
}) => (
  <div className={styles.blogGrid}>
    {articles.slice(0, postCount).map((article) => (
      <div key={article.sys.id}>
        <PostCard props={article} url={url} />
      </div>
    ))}
  </div>
);

export default function PostsMap({ 
  articles,
  className,
  initialPostCount = DEFAULT_CONFIG.initialPostCount,
  loadMoreIncrement = DEFAULT_CONFIG.loadMoreIncrement,
  url
}: PostsMapProps) {
  const [postCount, setPostCount] = useState(initialPostCount);

  // Memoize the showMore calculation for performance
  const showMore = useMemo(() => {
    return articles.length > postCount;
  }, [articles.length, postCount]);

  // Memoize the load more function
  const loadMore = useCallback(() => {
    setPostCount((prevCount) => prevCount + loadMoreIncrement);
  }, [loadMoreIncrement]);

  // Handle empty articles array
  if (!articles || articles.length === 0) {
    return (
      <div className={styles.emptyState} role="status">
        <p>Geen artikelen beschikbaar.</p>
      </div>
    );
  }

  const containerClass = [className].filter(Boolean).join(' ');

  return (
    <div className={containerClass}>
      <PostsGridDisplay 
        articles={articles}
        postCount={postCount}
        url={url}
      />
      
      {showMore && (
        <section 
          className={styles.blogBtn}
          aria-label="Meer artikelen laden"
        >
          <LoadMoreButton
            onClick={loadMore}
            waveAmount={DEFAULT_CONFIG.waveAmount}
            buttonText={DEFAULT_CONFIG.buttonText}
          />
        </section>
      )}
    </div>
  );
}
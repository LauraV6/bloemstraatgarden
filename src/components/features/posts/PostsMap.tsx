"use client";

import { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PostCard } from "./PostCard";
import { BlogGrid, EmptyState, BlogButtonSection, LoadMoreButtonStyled, Wave } from "./PostsMap.styled";

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
  waveAmount: 11,
  buttonText: "Geef water voor meer berichten",
  animationDuration: 0.3
} as const;

// Animation variants
const itemVariants = {
  initial: { 
    opacity: 0, 
    y: 50,
    scale: 0.9
  },
  animate: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    transition: {
      duration: 0.2
    }
  }
};

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
  <LoadMoreButtonStyled
    onClick={onClick}
    aria-label={`${buttonText} - Laad meer artikelen`}
  >
    <span>{buttonText}</span>
    {Array.from({ length: waveAmount }, (_, index) => (
      <Wave className="wave" key={`wave-${index}`} aria-hidden="true" />
    ))}
  </LoadMoreButtonStyled>
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
  <BlogGrid>
    <AnimatePresence mode="popLayout">
      {articles.slice(0, postCount).map((article, index) => (
        <motion.div 
          key={article.sys.id}
          layout
          variants={itemVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          whileHover={{ 
            scale: 1.03,
            transition: { duration: 0.2 }
          }}
        >
          <PostCard 
            props={article} 
            url={url} 
            priority={index < 2}
          />
        </motion.div>
      ))}
    </AnimatePresence>
  </BlogGrid>
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
    return articles && articles.length > postCount;
  }, [articles, postCount]);

  // Memoize the load more function
  const loadMore = useCallback(() => {
    setPostCount((prevCount) => prevCount + loadMoreIncrement);
  }, [loadMoreIncrement]);

  // Handle empty articles array
  if (!articles || articles.length === 0) {
    return (
      <EmptyState role="status">
        <p>Geen artikelen beschikbaar.</p>
      </EmptyState>
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
        <BlogButtonSection
          aria-label="Meer artikelen laden"
        >
          <LoadMoreButton
            onClick={loadMore}
            waveAmount={DEFAULT_CONFIG.waveAmount}
            buttonText={DEFAULT_CONFIG.buttonText}
          />
        </BlogButtonSection>
      )}
    </div>
  );
}
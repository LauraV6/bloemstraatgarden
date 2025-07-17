import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';
import styles from "./postCard.module.scss";

// Types
interface PostCardSkeletonProps {
  amount: number;
  className?: string;
}

// Constants
const SKELETON_CONFIG = {
  image: { height: 200 },
  title: { width: 200, height: 24 },
  summary: { width: 300, height: 16, count: 2 },
  date: { width: 120, height: 14 }
} as const;

// Components
interface SkeletonCardProps {
  index: number;
}

const SkeletonCard: React.FC<SkeletonCardProps> = ({ index }) => (
  <article 
    className={styles.postItem}
    aria-label={`Post kaart ${index + 1} wordt geladen`}
  >
    <div className={styles.postItem__img}>
      <Skeleton 
        height={SKELETON_CONFIG.image.height}
        style={{ display: 'block' }}
      />
    </div>
    
    <div className={styles.postItem__content}>
      <h2>
        <Skeleton 
          width={SKELETON_CONFIG.title.width}
          height={SKELETON_CONFIG.title.height}
        />
      </h2>
      
      <div>
        <Skeleton 
          count={SKELETON_CONFIG.summary.count}
          height={SKELETON_CONFIG.summary.height}
          style={{ marginBottom: '0.5rem' }}
        />
      </div>
      
      <div className={styles.date}>
        <Skeleton 
          width={SKELETON_CONFIG.date.width}
          height={SKELETON_CONFIG.date.height}
        />
      </div>
    </div>
  </article>
);

export default function PostCardSkeleton({ 
  amount, 
  className 
}: PostCardSkeletonProps) {
  // Validate amount prop
  const validAmount = Math.max(1, Math.min(amount || 1, 20)); // Limit between 1-20
  
  const containerClass = [className].filter(Boolean).join(' ');

  return (
    <div 
      className={containerClass}
      role="status" 
      aria-live="polite"
      aria-label={`${validAmount} post kaarten worden geladen`}
    >
      {Array.from({ length: validAmount }, (_, index) => (
        <SkeletonCard key={`skeleton-${index}`} index={index} />
      ))}
    </div>
  );
}
'use client';

import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';
import styled from '@emotion/styled';

const PostItem = styled.article`
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radii.md};
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  transition: transform ${({ theme }) => theme.transitions.normal}, 
              box-shadow ${({ theme }) => theme.transitions.normal};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.md};
  }
`;

const PostItemImg = styled.div`
  height: 200px;
  overflow: hidden;
  
  span {
    display: block;
    height: 100%;
  }
`;

const PostItemContent = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  flex: 1;
  
  h2 {
    margin-bottom: ${({ theme }) => theme.spacing.md};
    font-size: ${({ theme }) => theme.typography.fontSize.lg};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  }
`;

const SkeletonGrid = styled.div`
  display: grid;
  gap: 1.3rem;
  margin-top: 1.2rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    margin-top: 2rem;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

interface PostCardSkeletonProps {
  amount: number;
  className?: string;
}

const SKELETON_CONFIG = {
  image: { height: 200 },
  title: { width: 200, height: 24 },
  summary: { width: 300, height: 16, count: 2 },
  date: { width: 120, height: 14 }
} as const;

interface SkeletonCardProps {
  index: number;
}

const SkeletonCard: React.FC<SkeletonCardProps> = ({ index }) => (
  <PostItem aria-label={`Post kaart ${index + 1} wordt geladen`}>
    <PostItemImg>
      <Skeleton 
        height={SKELETON_CONFIG.image.height}
        style={{ display: 'block' }}
      />
    </PostItemImg>
    
    <PostItemContent>
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
    </PostItemContent>
  </PostItem>
);

export default function PostCardSkeleton({ 
  amount, 
  className 
}: PostCardSkeletonProps) {
  // Validate amount prop
  const validAmount = Math.max(1, Math.min(amount || 1, 20)); // Limit between 1-20

  return (
    <SkeletonGrid 
      className={className}
      role="status" 
      aria-live="polite"
      aria-label={`${validAmount} post kaarten worden geladen`}
    >
      {Array.from({ length: validAmount }, (_, index) => (
        <SkeletonCard key={`skeleton-${index}`} index={index} />
      ))}
    </SkeletonGrid>
  );
}
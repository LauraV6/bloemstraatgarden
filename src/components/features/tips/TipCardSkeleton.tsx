'use client';

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styled from '@emotion/styled';
import { TipsGridContainer } from './TipsGrid.styled';

const PostItem = styled.article`
  display: block;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radii.md};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.sm};
  transition: transform ${({ theme }) => theme.transitions.normal}, 
              box-shadow ${({ theme }) => theme.transitions.normal};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.md};
  }
  
  &.first-item {
    @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
      grid-row-start: 1;
      grid-row-end: 3;
    }
  }
`;

const PostItemImg = styled.div`
  height: 200px;
  overflow: hidden;
  
  span {
    display: block;
    height: 100%;
  }
  
  .first-item & {
    @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
      height: 100%;
      min-height: 400px;
    }
  }
`;

interface TipCardSkeletonProps {
  amount?: number;
}

export default function TipCardSkeleton({ amount = 5 }: TipCardSkeletonProps) {
  return (
    <TipsGridContainer>
      {Array(amount)
        .fill(0)
        .map((_, index) => (
          <PostItem key={index} className={index === 0 ? 'first-item' : ''}>
            <PostItemImg className="tip-item__img">
              <Skeleton height="100%" />
            </PostItemImg>
          </PostItem>
        ))}
    </TipsGridContainer>
  );
}

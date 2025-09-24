'use client';

import styled from '@emotion/styled';
import { Story, StoryContainer, StoryText, StoryAdding } from "@/components/features/stocking/Stock.styled";
import { TitleLineHeading } from "@/components/ui/TitleLine/TitleLine.styled";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const PostHeader = styled.section`
  position: relative;
  width: 100%;
  max-width: unset;
  height: 380px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 113px 0px 0px;
  margin: 0px;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    height: 600px;
    padding: 154px 0px 0px;
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.4);
    z-index: 1;
  }
`;

const PostHeaderContent = styled.div`
  text-align: center;
`;

const Breadcrumbs = styled.div`
  padding: ${({ theme }) => theme.spacing.md} 0;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export default function Available() {
  const skeletonProps = {
    baseColor: "rgba(153, 153, 153, 0.1)",
    highlightColor: "rgba(153, 153, 153, 0.2)"
  };

  return (
    <main aria-busy="true" aria-live="polite" aria-label="Loading content">
      <PostHeader>
        <PostHeaderContent>
          <div>
            <h1>
              <Skeleton width={200}
                baseColor="rgba(255, 255, 255, 0.1)"
                highlightColor="rgba(255, 255, 255, 0.2)" />
            </h1>
            <label>
              <Skeleton width={100}
                baseColor="rgba(255, 255, 255, 0.1)"
                highlightColor="rgba(255, 255, 255, 0.2)" />
            </label>
          </div>
        </PostHeaderContent>
      </PostHeader>
      <section>
        <Breadcrumbs>
          <Skeleton width={150} {...skeletonProps} />
        </Breadcrumbs>
        <Story>
          <StoryContainer>
            <StoryText>
              <h2>
                <Skeleton width={250} {...skeletonProps} />
              </h2>
              <p>
                <Skeleton count={3} {...skeletonProps} />
              </p>
            </StoryText>
            <StoryAdding>
              <Skeleton width={400} height={270} {...skeletonProps} />
            </StoryAdding>
          </StoryContainer>
        </Story>
      </section>
      <section>
        <TitleLineHeading>
          <span>
            <Skeleton width={150} {...skeletonProps} />
          </span>
        </TitleLineHeading>
        <div>
          <Skeleton width={500} {...skeletonProps} />
        </div>
      </section>
    </main>
  );
}
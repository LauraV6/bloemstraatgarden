'use client';

import styled from '@emotion/styled';
import { Story, StoryContainer, StoryText, StoryAdding } from "@/components/features/stocking/Stock.styled";
import { TitleLineHeading } from "@/components/ui/TitleLine/TitleLine.styled";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const PostHeader = styled.section`
  position: relative;
  min-height: 400px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  
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
  position: relative;
  z-index: 2;
  text-align: center;
  color: white;
  max-width: 800px;
  padding: ${({ theme }) => theme.spacing.xl};
  
  h1 {
    font-size: ${({ theme }) => theme.typography.fontSize['4xl']};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
    margin-bottom: ${({ theme }) => theme.spacing.md};
    color: white;
  }
  
  label {
    font-size: ${({ theme }) => theme.typography.fontSize.lg};
    color: rgba(255, 255, 255, 0.9);
  }
`;

const Breadcrumbs = styled.div`
  padding: ${({ theme }) => theme.spacing.md} 0;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export default function Available() {
  return (
    <>
      <main>
        <PostHeader>
          <PostHeaderContent>
            <div>
              <h1>
                <Skeleton width={200} />
              </h1>
              <label>
                <Skeleton width={100} />
              </label>
            </div>
          </PostHeaderContent>
        </PostHeader>
        <section>
          <Breadcrumbs>
            <Skeleton width={150} />
          </Breadcrumbs>
          <Story>
            <StoryContainer>
              <StoryText>
                <h2>
                  <Skeleton width={250} />
                </h2>
                <p>
                  <Skeleton count={3} />
                </p>
              </StoryText>
              <StoryAdding>
                <Skeleton width={400} height={270} />
              </StoryAdding>
            </StoryContainer>
          </Story>
        </section>
        <section>
          <TitleLineHeading>
            <span>
              <Skeleton width={150} />
            </span>
          </TitleLineHeading>
          <div>
            <Skeleton width={500} />
          </div>
        </section>
      </main>
    </>
  )
}
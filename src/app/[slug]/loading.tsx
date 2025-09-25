'use client';

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Sidebar from "@/components/layout/Sidebar";
import styled from '@emotion/styled';

const PostHeader = styled.section`
  position: relative;
  display: grid;
  width: 100%;
  max-width: 100vw;
  height: 350px;
  max-height: 350px;
  background: ${({ theme }) => theme.colors.background === '#23252a'
    ? 'linear-gradient(135deg, #374151, #4b5563)'
    : 'linear-gradient(135deg, #e2e8f0, #cbd5e1)'};
  background-size: cover;
  background-position: center;
  padding: 0;
  margin: 0;
  overflow: hidden;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    height: 600px;
    max-height: 600px;
  }

  &::after {
    content: "";
    background-image: linear-gradient(180deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.45) 100%);
    z-index: 0;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    pointer-events: none;
  }
`;

const PostHeaderContent = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  max-width: 1200px;
  width: 100%;
  bottom: 0;
  left: 0;
  z-index: 1;
  padding: 1rem;
  margin: 0;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    width: calc(100% - 4rem);
    padding: 0 2rem;
    margin: 3rem auto;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    width: calc(100% - 10rem);
  }
`;

const PostContent = styled.section`
  display: grid;
  gap: 1.5rem;
  max-width: 1200px;
  width: 100%;
  padding: 0 1rem;
  margin: 2rem auto;
  box-sizing: border-box;
  align-items: start;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 60% 1fr;
    gap: 4rem;
    width: calc(100% - 4rem);
    padding: 0 2rem;
    margin: 3rem auto;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr 260px;
    gap: 5rem;
    width: calc(100% - 10rem);
    margin: 5rem auto;
  }
`;

const PostStory = styled.div`
  overflow-x: hidden;
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.text};
`;

const WeatherSkeleton = styled.div`
  display: flex;
  align-items: flex-end;
  margin-bottom: 1rem;
  
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-bottom: 0;
  }
`;

const Breadcrumbs = styled.nav`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
`;

interface PageLoaderProps {
  className?: string;
  showWeather?: boolean;
  contentLines?: number;
}

interface SkeletonSectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const SKELETON_CONFIG = {
  title: { width: 200, height: 48 },
  date: { width: 150, height: 20 },
  breadcrumbs: { width: 250, height: 16 },
  defaultContentLines: 8,
  weather: { width: 100, height: 40 }
} as const;

const SkeletonSection: React.FC<SkeletonSectionProps> = ({
  title,
  children,
  className
}) => (
  <section className={className} aria-label={`${title} wordt geladen`}>
    {children}
  </section>
);

const PostHeaderSkeleton: React.FC<{ showWeather?: boolean }> = ({ showWeather = true }) => (
  <PostHeader as={SkeletonSection} title="Artikel header">
    <PostHeaderContent>
      <div>
        <h1>
          <Skeleton
            width={SKELETON_CONFIG.title.width}
            height={SKELETON_CONFIG.title.height}
            baseColor="rgba(255, 255, 255, 0.1)"
            highlightColor="rgba(255, 255, 255, 0.2)"
          />
        </h1>
        <div>
          <Skeleton
            width={SKELETON_CONFIG.date.width}
            height={SKELETON_CONFIG.date.height}
            baseColor="rgba(255, 255, 255, 0.1)"
            highlightColor="rgba(255, 255, 255, 0.2)"
          />
        </div>
      </div>
      {showWeather && (
        <WeatherSkeleton>
          <Skeleton
            width={SKELETON_CONFIG.weather.width}
            height={SKELETON_CONFIG.weather.height}
            baseColor="rgba(255, 255, 255, 0.1)"
            highlightColor="rgba(255, 255, 255, 0.2)"
          />
        </WeatherSkeleton>
      )}
    </PostHeaderContent>
  </PostHeader>
);

const ContentSkeleton: React.FC<{ contentLines: number }> = ({ contentLines }) => (
  <article>
    <Breadcrumbs aria-label="Breadcrumb navigatie wordt geladen">
      <Skeleton
        width={SKELETON_CONFIG.breadcrumbs.width}
        height={SKELETON_CONFIG.breadcrumbs.height}
        baseColor="rgba(153, 153, 153, 0.1)"
        highlightColor="rgba(153, 153, 153, 0.2)"
      />
    </Breadcrumbs>

    <PostStory aria-label="Artikel inhoud wordt geladen">
      <Skeleton
        count={contentLines}
        style={{ marginBottom: '1.5rem' }}
        baseColor="rgba(153, 153, 153, 0.1)"
        highlightColor="rgba(153, 153, 153, 0.2)"
      />
      <Skeleton
        width="80%"
        style={{ marginBottom: '1.5rem' }}
        baseColor="rgba(153, 153, 153, 0.1)"
        highlightColor="rgba(153, 153, 153, 0.2)"
      />
      <Skeleton
        height={300}
        style={{ marginBottom: '1.5rem', borderRadius: '8px' }}
        baseColor="rgba(153, 153, 153, 0.1)"
        highlightColor="rgba(153, 153, 153, 0.2)"
      />
      <Skeleton
        count={contentLines - 2}
        style={{ marginBottom: '1.5rem' }}
        baseColor="rgba(153, 153, 153, 0.1)"
        highlightColor="rgba(153, 153, 153, 0.2)"
      />
    </PostStory>
  </article>
);

export default function PageLoader({
  className,
  showWeather = true,
  contentLines = SKELETON_CONFIG.defaultContentLines
}: PageLoaderProps) {
  const mainClass = [className].filter(Boolean).join(' ');

  return (
    <main className={mainClass} role="main" aria-label="Pagina wordt geladen">
      <PostHeaderSkeleton showWeather={showWeather} />

      <PostContent>
        <ContentSkeleton contentLines={contentLines} />
        <Sidebar />
      </PostContent>
    </main>
  );
}
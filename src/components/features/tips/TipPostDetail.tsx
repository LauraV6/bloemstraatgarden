'use client';

import { useTipBySlug, useTips } from '@/hooks/useContentful';
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRight } from "@awesome.me/kit-7d648e8e96/icons/duotone/solid";
import ErrorState from '@/components/ui/ErrorState';
import { MorePosts } from "@/components/features/posts/MorePosts";
import Sidebar from "@/components/layout/Sidebar";
import PageLoader from '@/app/[slug]/loading';
import styled from '@emotion/styled';

const PostHeader = styled.section`
  position: relative;
  display: grid;
  width: 100%;
  max-width: 100vw;
  height: 350px;
  max-height: 350px;
  background-repeat: no-repeat;
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
  padding: 0;
  margin: 0;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    width: calc(100% - 4rem);
    padding: 0 2rem;
    margin: 3rem auto;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    width: calc(100% - 10rem);
    padding: 0 2rem;
  }
  
  > div {
    margin: 1rem;

    @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
      margin: 0;
    }

    h1, time {
      color: hsl(0, 0%, 100%) !important;
    }

    h1 {
      max-width: 850px;
      margin-bottom: 0.5rem;
      animation: load_in 1s forwards;
      font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
      font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
      font-family: ${({ theme }) => theme.typography.fontFamilyHeading};
      color: white !important;
      color: hsl(0, 0%, 100%) !important;
      word-wrap: break-word;
      line-height: 1.2;
      
      @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
        font-size: ${({ theme }) => theme.typography.fontSize['4xl']};
      }
    }
  }
  
  time {
    font-size: ${({ theme }) => theme.typography.fontSize.base};
    color: rgba(255, 255, 255, 0.9);
    
    @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
      font-size: ${({ theme }) => theme.typography.fontSize.lg};
    }
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

  article {
    min-width: 0;
    overflow: hidden;

    @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
      overflow: unset;
    }
  }
`;

const Breadcrumbs = styled.nav`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
  
  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
    transition: color ${({ theme }) => theme.transitions.fast};
    
    &:hover {
      color: ${({ theme }) => theme.colors.primaryDark};
      text-decoration: underline;
    }
  }
  
  svg {
    width: 12px;
    height: 12px;
    color: ${({ theme }) => theme.colors.textMuted};
  }
  
  span {
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

const PostStory = styled.div`
  overflow-x: hidden;
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  line-height: 1.5;
  
  h2, h3, h4 {
    margin-top: 1.2rem;
    font-family: ${({ theme }) => theme.typography.fontFamilyHeading};
  }

  img {
    width: 100%;
    border-radius: 5px;
    height: 260px;
    object-fit: cover;
    margin: 1rem 0;

    @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
      height: 300px;
    }

    @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
      height: 500px;
    }
  }

  p {
    line-height: 1.5;
    margin-bottom: ${({ theme }) => theme.spacing.lg};
  }

  ul {
    padding-left: 1rem;

    li {
      padding-left: 7px;

      &::marker {
        content: '\\279c';
        color: ${({ theme }) => theme.colors.primaryDark};
      }
    }
  }
`;

interface TipPostApolloProps {
  slug: string;
}

export default function TipPostApollo({ slug }: TipPostApolloProps) {
  const { tip, loading: tipLoading, error: tipError } = useTipBySlug(slug);
  const { tips: allTips, loading: tipsLoading } = useTips(10);

  if (tipLoading) {
    return <PageLoader showWeather={false} contentLines={6} />;
  }

  if (tipError) {
    return (
      <ErrorState 
        error={tipError}
        onRetry={() => window.location.reload()}
        fullPage
      />
    );
  }

  if (!tip) {
    return (
      <ErrorState 
        error="Tip niet gevonden"
        fullPage
      />
    );
  }

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("nl-NL", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const createAssetMap = (assets: any[]) => {
    const assetMap = new Map();
    for (const asset of assets) {
      assetMap.set(asset.sys.id, asset);
    }
    return assetMap;
  };

  const assetMap = createAssetMap(tip.details.links.assets.block);
  
  const renderOptions = {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
        const assetId = node.data.target.sys.id;
        const asset = assetMap.get(assetId);
        
        if (!asset) {
          return null;
        }

        return (
          <Image
            src={asset.url}
            alt={asset.title || "Afbeelding"}
            width={900}
            height={500}
            sizes="(max-width: 768px) 100vw, 900px"
            style={{ 
              width: '100%', 
              height: 'auto',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
            }}
          />
        );
      },
    },
  };

  return (
    <>
      {/* Hero Header with Background Image */}
      <PostHeader
        style={{ backgroundImage: `url(${tip.articleImage.url})` }}
        role="banner"
        aria-label={tip.articleImage.title || `Header afbeelding voor ${tip.title}`}
      >
        <PostHeaderContent>
          <div>
            <h1 style={{ color: 'white' }}>{tip.title}</h1>
            <time dateTime={tip.date}>
              {formatDate(tip.date)}
            </time>
          </div>
        </PostHeaderContent>
      </PostHeader>

      {/* Main Content Section */}
      <PostContent>
        <article>
          {/* Breadcrumbs */}
          <Breadcrumbs aria-label="Breadcrumb navigatie">
            <Link href="/tips" aria-label="Ga naar Tips">
              Tips
            </Link>
            <FontAwesomeIcon icon={faRight} aria-hidden="true" />
            <span aria-current="page">{tip.title}</span>
          </Breadcrumbs>

          {/* Article Content */}
          <PostStory>
            {documentToReactComponents(tip.details.json, renderOptions)}
          </PostStory>

          {/* More Posts Section */}
          {allTips && allTips.length > 0 && (
            <MorePosts 
              title="Meer moestuin tips" 
              slug={tip.slug} 
              articles={allTips}
              url="/tips"
            />
          )}
        </article>

        <Sidebar />
      </PostContent>
    </>
  );
}
'use client';

import { useArticleBySlug, useArticles } from '@/hooks/useContentful';
import { Article } from '@/types/contentful';
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRight } from "@awesome.me/kit-7d648e8e96/icons/duotone/solid";
import ErrorState from '@/components/ui/ErrorState';
import Weather from "@/components/features/weather/Weather";
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

    h1, label, path, span {
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
`;

const PostDate = styled.time`
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  color: rgba(255, 255, 255, 0.9);
  
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.typography.fontSize.lg};
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

const PostStory = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.text};
  
  h2, h3, h4 {
    margin-top: 1.2rem;
    font-family: ${({ theme }) => theme.typography.fontFamilyHeading};
  }

  h6 {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
    font-size: 1em;
    color: ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => theme.colors.transparent};
    border-radius: 50%;
    margin: -50px 0 0 10px;

    @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
      width: 60px;
      height: 60px;
      font-size: 2em;
      margin: -90px 0 0 20px;
    }
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
  }

  b {
    font-weight: 500;
  }

  blockquote {
    margin: 2rem 0 0.5rem 0;

    p {
      position: absolute;
      background-color: ${({ theme }) => theme.colors.primary};
      color: ${({ theme }) => theme.colors.green5};
      border-radius: 5px;
      font-weight: bold;
      width: fit-content;
      font-size: 0.8em;
      text-transform: uppercase;
      padding: 6px 10px;
      margin: -4px 0 0 10px;

      @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
        padding: 8px 15px;
        margin: -8px 0 0 20px;
      }
    }
  }

  ul {
    padding-left: 1rem;

    li {
      padding-left: 7px;

      &::marker {
        content: '➜';
        color: ${({ theme }) => theme.colors.primaryDark};
      }
    }
  }

  sup {
    display: block;
    color: ${({ theme }) => theme.colors.background === '#23252a' 
      ? 'hsl(128, 22%, 85%)' // Light green text for dark mode
      : theme.colors.primaryDark}; // Dark green text for light mode
    font-family: var(--font-pacaembu);
    background-color: ${({ theme }) => theme.colors.green5};
    border-radius: 5px;
    font-size: 1.1em;
    line-height: 1.6;
    text-align: center;
    font-weight: 600;
    padding: 2.5rem 1.5rem;
    margin: 2rem 0;
  }
`;

const ContentImage = styled.img`
  border-radius: ${({ theme }) => theme.radii.lg};
  box-shadow: ${({ theme }) => theme.shadows.md};
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

interface BlogPostApolloProps {
  slug: string;
}

export default function BlogPostApollo({ slug }: BlogPostApolloProps) {
  const { article, loading: articleLoading, error: articleError } = useArticleBySlug(slug);
  const { articles: allArticles, loading: articlesLoading } = useArticles(100);

  if (articleLoading) {
    return <PageLoader showWeather={true} contentLines={8} />;
  }

  if (articleError) {
    return (
      <ErrorState 
        error={articleError}
        onRetry={() => window.location.reload()}
        fullPage
      />
    );
  }

  if (!article) {
    return (
      <ErrorState 
        error="Artikel niet gevonden"
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

  const assetMap = createAssetMap(article.details.links.assets.block);
  
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
        style={{ backgroundImage: `url(${article.articleImage.url})` }}
        role="banner"
        aria-label={article.articleImage.title || `Header afbeelding voor ${article.title}`}
      >
        <PostHeaderContent>
          <div>
            <h1 style={{ color: 'white' }}>{article.title}</h1>
            <PostDate dateTime={article.date}>
              {formatDate(article.date)}
            </PostDate>
          </div>
          {article.weather && <Weather weatherType={article.weather} />}
        </PostHeaderContent>
      </PostHeader>

      {/* Main Content Section */}
      <PostContent>
        <article>
          {/* Breadcrumbs */}
          <Breadcrumbs aria-label="Breadcrumb navigatie">
            <Link href="/" aria-label="Ga naar Blog">
              Blog
            </Link>
            <FontAwesomeIcon icon={faRight} aria-hidden="true" />
            <span aria-current="page">{article.title}</span>
          </Breadcrumbs>

          {/* Article Content */}
          <PostStory>
            {documentToReactComponents(article.details.json, renderOptions)}
          </PostStory>

          {/* More Posts Section */}
          {!articlesLoading && allArticles && (
            <MorePosts 
              title="Meer over onze moestuin" 
              slug={article.slug} 
              articles={allArticles.filter((a): a is Article => a !== undefined)}
            />
          )}
        </article>

        <Sidebar />
      </PostContent>
    </>
  );
}
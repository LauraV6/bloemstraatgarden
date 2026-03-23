'use client';

import { useArticleBySlug, useArticles } from '@/hooks/useContentful';
import { Article } from '@/types/contentful';
import { formatDate, createAssetMap } from '@/lib/contentful-utils';
import { documentToReactComponents, Options } from "@contentful/rich-text-react-renderer";
import { BLOCKS, type Block, type Inline } from "@contentful/rich-text-types";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRight } from "@awesome.me/kit-7d648e8e96/icons/duotone/solid";
import ErrorState from '@/components/ui/ErrorState';
import Weather from "@/components/features/weather/Weather";
import { MorePosts } from "@/components/features/posts/MorePosts";
import Sidebar from "@/components/layout/Sidebar";
import PageLoader from '@/app/[slug]/loading';
import {
  PostHeader,
  PostHeaderContent,
  PostDate,
  PostContent,
  PostStory,
  Breadcrumbs,
} from '@/components/features/posts/PostDetail.styled';

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

  const assetMap = createAssetMap(article.details.links.assets.block);

  const renderOptions: Options = {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: (node: Block | Inline) => {
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
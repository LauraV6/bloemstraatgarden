'use client';

import { useArticleBySlug, useArticles } from '@/hooks/useContentful';
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRight } from "@awesome.me/kit-7d648e8e96/icons/duotone/solid";
import LoadingState from '@/components/ui/LoadingState';
import ErrorState from '@/components/ui/ErrorState';
import Weather from "@/components/features/weather/Weather";
import { MorePosts } from "@/components/features/posts/MorePosts";
import Sidebar from "@/components/layout/Sidebar";
import styles from '@/app/[slug]/page.module.scss';

interface BlogPostApolloProps {
  slug: string;
}

export default function BlogPostApollo({ slug }: BlogPostApolloProps) {
  const { article, loading: articleLoading, error: articleError } = useArticleBySlug(slug);
  const { articles: allArticles, loading: articlesLoading } = useArticles(100);

  if (articleLoading) {
    return <LoadingState message="Artikel laden..." fullPage />;
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
              borderRadius: '8px'
            }}
            className={styles.contentImage}
          />
        );
      },
    },
  };

  return (
    <>
      {/* Hero Header with Background Image */}
      <section
        className={styles.postheader}
        style={{ backgroundImage: `url(${article.articleImage.url})` }}
        role="banner"
        aria-label={article.articleImage.title || `Header afbeelding voor ${article.title}`}
      >
        <div className={styles.postheader__content}>
          <div>
            <h1>{article.title}</h1>
            <time dateTime={article.date} className={styles.postDate}>
              {formatDate(article.date)}
            </time>
          </div>
          {article.weather && <Weather weatherType={article.weather} />}
        </div>
      </section>

      {/* Main Content Section */}
      <section className={styles.postcontent}>
        <article>
          {/* Breadcrumbs */}
          <nav className="breadcrumbs" aria-label="Breadcrumb navigatie">
            <Link href="/" aria-label="Ga naar Blog">
              Blog
            </Link>
            <FontAwesomeIcon icon={faRight} aria-hidden="true" />
            <span aria-current="page">{article.title}</span>
          </nav>

          {/* Article Content */}
          <div className={styles.postcontent__story}>
            {documentToReactComponents(article.details.json, renderOptions)}
          </div>

          {/* More Posts Section */}
          {!articlesLoading && allArticles && (
            <MorePosts 
              title="Meer over onze moestuin" 
              slug={article.slug} 
              articles={allArticles}
            />
          )}
        </article>

        <Sidebar />
      </section>
    </>
  );
}
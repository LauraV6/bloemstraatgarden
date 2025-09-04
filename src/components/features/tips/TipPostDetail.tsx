'use client';

import { useTipBySlug, useTips } from '@/hooks/useContentful';
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRight } from "@awesome.me/kit-7d648e8e96/icons/duotone/solid";
import LoadingState from '@/components/ui/LoadingState';
import ErrorState from '@/components/ui/ErrorState';
import { MorePosts } from "@/components/features/posts/MorePosts";
import Sidebar from "@/components/layout/Sidebar";
import styles from '@/app/[slug]/page.module.scss';

interface TipPostApolloProps {
  slug: string;
}

export default function TipPostApollo({ slug }: TipPostApolloProps) {
  const { tip, loading: tipLoading, error: tipError } = useTipBySlug(slug);
  const { tips: allTips, loading: tipsLoading } = useTips(10);

  if (tipLoading) {
    return <LoadingState message="Tip laden..." fullPage />;
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
        style={{ backgroundImage: `url(${tip.articleImage.url})` }}
        role="banner"
        aria-label={tip.articleImage.title || `Header afbeelding voor ${tip.title}`}
      >
        <div className={styles.postheader__content}>
          <div>
            <h1>{tip.title}</h1>
            <time dateTime={tip.date} style={{ color: 'hsl(0, 0%, 100%)' }}>
              {formatDate(tip.date)}
            </time>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className={styles.postcontent}>
        <article>
          {/* Breadcrumbs */}
          <nav className="breadcrumbs" aria-label="Breadcrumb navigatie">
            <Link href="/tips" aria-label="Ga naar Tips">
              Tips
            </Link>
            <FontAwesomeIcon icon={faRight} aria-hidden="true" />
            <span aria-current="page">{tip.title}</span>
          </nav>

          {/* Article Content */}
          <div className={styles.postcontent__story}>
            {documentToReactComponents(tip.details.json, renderOptions)}
          </div>

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
      </section>
    </>
  );
}
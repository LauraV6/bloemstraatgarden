'use client';

import { useTipBySlug, useTips } from '@/hooks/useContentful';
import { formatDate, createAssetMap } from '@/lib/contentful-utils';
import { documentToReactComponents, Options } from "@contentful/rich-text-react-renderer";
import { BLOCKS, Block, Inline } from "@contentful/rich-text-types";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRight } from "@awesome.me/kit-7d648e8e96/icons/duotone/solid";
import ErrorState from '@/components/ui/ErrorState';
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

interface TipPostApolloProps {
  slug: string;
}

export default function TipPostApollo({ slug }: TipPostApolloProps) {
  const { tip, loading: tipLoading, error: tipError } = useTipBySlug(slug);
  const { tips: allTips } = useTips(10);

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

  const assetMap = createAssetMap(tip.details.links.assets.block);

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
        style={{ backgroundImage: `url(${tip.articleImage.url})` }}
        role="banner"
        aria-label={tip.articleImage.title || `Header afbeelding voor ${tip.title}`}
      >
        <PostHeaderContent>
          <div>
            <h1 style={{ color: 'white' }}>{tip.title}</h1>
            <PostDate dateTime={tip.date}>
              {formatDate(tip.date)}
            </PostDate>
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
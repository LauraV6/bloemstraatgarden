import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRight } from "@awesome.me/kit-7d648e8e96/icons/duotone/solid";
import { BLOCKS } from "@contentful/rich-text-types";
import type { Document, Block } from "@contentful/rich-text-types";
import type { Metadata } from "next";
import Sidebar from "@/components/layout/Sidebar";
import { MorePosts } from "@/components/features/posts/MorePosts";
import styles from "@/app/[slug]/page.module.scss";
import TipsPageClient from "@/components/TipsPageClient";
import TipPostApollo from "@/components/TipPostApollo";

interface TipsPageParams {
  slug: string;
}

interface TipsPageProps {
  params: Promise<TipsPageParams>;
}

interface ContentfulAsset {
  sys: { id: string };
  url: string;
  title: string;
  description?: string;
}

interface ContentfulLinks {
  assets: {
    block: ContentfulAsset[];
  };
}

interface Article {
  slug: string;
  title: string;
  date: string;
  articleImage: {
    url: string;
    title?: string;
  };
  details: {
    json: Document;
    links: ContentfulLinks;
  };
}

// Constants
const DATE_FORMAT_OPTIONS: Intl.DateTimeFormatOptions = {
  day: "numeric",
  month: "long",
  year: "numeric",
} as const;

const BREADCRUMB_CONFIG = {
  homeLabel: "Blog",
  homeUrl: "/",
  separator: faRight
} as const;

// Utility functions
const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString("nl-NL", DATE_FORMAT_OPTIONS);
};

const createAssetMap = (assets: ContentfulAsset[]): Map<string, ContentfulAsset> => {
  const assetMap = new Map<string, ContentfulAsset>();
  for (const asset of assets) {
    assetMap.set(asset.sys.id, asset);
  }
  return assetMap;
};

// Rich text render options
const createRenderOptions = (links: ContentfulLinks) => {
  const assetMap = createAssetMap(links.assets.block);

  return {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: (node: Block | any) => {
        const asset = assetMap.get(node.data.target.sys.id);
        if (!asset) {
          console.warn(`Asset not found for ID: ${node.data.target.sys.id}`);
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
};

// Components
interface BreadcrumbsProps {
  homeLabel: string;
  homeUrl: string;
  currentTitle: string;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ homeLabel, homeUrl, currentTitle }) => (
  <nav className="breadcrumbs" aria-label="Breadcrumb navigatie">
    <Link href={homeUrl} aria-label={`Ga naar ${homeLabel}`}>
      {homeLabel}
    </Link>
    <FontAwesomeIcon icon={BREADCRUMB_CONFIG.separator} aria-hidden="true" />
    <span aria-current="page">{currentTitle}</span>
  </nav>
);

interface PostHeaderProps {
  title: string;
  date: string;
  backgroundImageUrl: string;
  imageAlt?: string;
}

const PostHeader: React.FC<PostHeaderProps> = ({ 
  title, 
  date, 
  backgroundImageUrl, 
  imageAlt 
}) => (
  <section
    className={styles.postheader}
    style={{ backgroundImage: `url(${backgroundImageUrl})` }}
    role="banner"
    aria-label={imageAlt || `Header afbeelding voor ${title}`}
  >
    <div className={styles.postheader__content}>
      <div>
        <h1>{title}</h1>
        <time dateTime={date} className={styles.postDate}>
          {formatDate(date)}
        </time>
      </div>
    </div>
  </section>
);

// Generate metadata for each tip page
export async function generateMetadata({ params }: TipsPageProps): Promise<Metadata> {
  const { slug } = await params;
  
  return {
    title: `Moestuin Tips - Bloemstraat Garden`,
    description: `Lees onze moestuin tips`,
  };
}

// Static params generation - disabled for now since we're using Apollo
export async function generateStaticParams(): Promise<TipsPageParams[]> {
  return [];
}

export default async function TipsPage({ params }: TipsPageProps) {
  const { slug } = await params;
  
  return (
    <main role="main">
      <TipsPageClient>
        <TipPostApollo slug={slug} />
      </TipsPageClient>
    </main>
  );
}
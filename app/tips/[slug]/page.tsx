import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRight } from "@awesome.me/kit-7d648e8e96/icons/duotone/solid";
import { BLOCKS } from "@contentful/rich-text-types";
import type { Document } from "@contentful/rich-text-types";
import type { Metadata } from "next";
import { getAllTips, getTip } from "@/lib/api";
import Sidebar from "@/components/layout/sidebar";
import { MorePosts } from "../../../components/posts/morePosts";
import styles from "../../[slug]/page.module.scss";
import TipsPageClient from "@/components/tipsPageClient";

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
      [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
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
  
  try {
    const tip = await getTip(slug);
    
    if (!tip) {
      return {
        title: 'Tip niet gevonden - Bloemstraat Garden',
      };
    }
    
    return {
      title: `${tip.title} - Moestuin Tips - Bloemstraat Garden`,
      description: tip.summary || `Lees onze moestuin tip: ${tip.title}`,
      openGraph: {
        title: tip.title,
        description: tip.summary,
        images: tip.articleImage?.url ? [tip.articleImage.url] : [],
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: 'Moestuin Tips - Bloemstraat Garden',
    };
  }
}

// Static params generation
export async function generateStaticParams(): Promise<TipsPageParams[]> {
  try {
    const allTips = await getAllTips();
    return allTips.map((article: Article) => ({
      slug: article.slug,
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

export default async function TipsPage({ params }: TipsPageProps) {
  const { slug } = await params;
  
  try {
    const [article, allTips] = await Promise.all([
      getTip(slug),
      getAllTips()
    ]);

    if (!article) {
      notFound();
    }

    const renderOptions = createRenderOptions(article.details.links);

    return (
      <main role="main">
        <TipsPageClient>
          <PostHeader
            title={article.title}
            date={article.date}
            backgroundImageUrl={article.articleImage.url}
            imageAlt={article.articleImage.title}
          />
          
          <section className={styles.postcontent}>
            <article>
              <Breadcrumbs
                homeLabel={BREADCRUMB_CONFIG.homeLabel}
                homeUrl={BREADCRUMB_CONFIG.homeUrl}
                currentTitle={article.title}
              />
              
              <div className={styles.postcontent__story}>
                {documentToReactComponents(article.details.json, renderOptions)}
              </div>
              
              <MorePosts 
                title="Meer moestuin tips" 
                slug={article.slug} 
                articles={allTips} 
                url="/tips" 
              />
            </article>
            
            <Sidebar />
          </section>
        </TipsPageClient>
      </main>
    );
  } catch (error) {
    console.error("Error loading tip:", error);
    notFound();
  }
}
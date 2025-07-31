import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRight } from "@awesome.me/kit-7d648e8e96/icons/duotone/solid";
import { BLOCKS } from "@contentful/rich-text-types";
import type { Document } from "@contentful/rich-text-types";
import type { Metadata } from "next";
import { getAllArticles, getArticle } from "@/lib/api";
import Sidebar from "@/components/layout/sidebar";
import Weather from "../../components/weather";
import { MorePosts } from "../../components/posts/morePosts";
import styles from "./page.module.scss";
import BlogPostClient from "@/components/blogPostClient";

// Types
interface ArticlePageParams {
  slug: string;
}

interface ArticlePageProps {
  params: Promise<ArticlePageParams>;
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
  weather?: string;
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
  weather?: string;
}

const PostHeader: React.FC<PostHeaderProps> = ({ 
  title, 
  date, 
  backgroundImageUrl, 
  imageAlt,
  weather 
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
      {weather && <Weather weatherType={weather} />}
    </div>
  </section>
);

// Generate metadata for each article page
export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  
  try {
    const article = await getArticle(slug);
    
    if (!article) {
      return {
        title: 'Artikel niet gevonden - Bloemstraat Garden',
      };
    }
    
    return {
      title: `${article.title} - Bloemstraat Garden`,
      description: article.summary || `Lees meer over ${article.title} in onze moestuin`,
      openGraph: {
        title: article.title,
        description: article.summary,
        images: article.articleImage?.url ? [article.articleImage.url] : [],
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: 'Bloemstraat Garden',
    };
  }
}

// Static params generation
export async function generateStaticParams(): Promise<ArticlePageParams[]> {
  try {
    const allArticles = await getAllArticles();
    return allArticles.map((article: Article) => ({
      slug: article.slug,
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

export default async function KnowledgeArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  
  try {
    const [article, allArticles] = await Promise.all([
      getArticle(slug),
      getAllArticles()
    ]);

    if (!article) {
      notFound();
    }

    const renderOptions = createRenderOptions(article.details.links);

    return (
      <main role="main">
        <BlogPostClient>
          <PostHeader
            title={article.title}
            date={article.date}
            backgroundImageUrl={article.articleImage.url}
            imageAlt={article.articleImage.title}
            weather={article.weather}
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
                title="Meer over onze moestuin" 
                slug={article.slug} 
                articles={allArticles}
              />
            </article>
            
            <Sidebar />
          </section>
        </BlogPostClient>
      </main>
    );
  } catch (error) {
    console.error("Error loading article:", error);
    notFound();
  }
}
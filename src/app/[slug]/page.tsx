import type { Metadata } from "next";
import BlogPostClient from "@/components/BlogPostClient";
import BlogPostDetail from "@/components/features/blog/BlogPostDetail";
import { fetchArticles } from "@/lib/api/contentful/client-cdn";

interface ArticlePageParams {
  slug: string;
}

interface ArticlePageProps {
  params: Promise<ArticlePageParams>;
}

async function getArticleBySlug(slug: string) {
  const { items } = await fetchArticles(100, 0);
  return items.find((article) => article.slug === slug) ?? null;
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    const formattedTitle = slug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    return {
      title: `${formattedTitle} | Bloemstraat Garden`,
      description: `Lees meer over ${formattedTitle.toLowerCase()} in onze moestuin blog`,
    };
  }

  return {
    title: `${article.title} | Bloemstraat Garden`,
    description: article.summary,
    openGraph: {
      title: article.title,
      description: article.summary,
      type: 'article',
      publishedTime: article.date,
      ...(article.articleImage?.url && {
        images: [{ url: article.articleImage.url, alt: article.title }],
      }),
    },
  };
}

export default async function KnowledgeArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  const jsonLd = article
    ? {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: article.title,
        description: article.summary,
        datePublished: article.date,
        author: { '@type': 'Organization', name: 'Bloemstraat Garden' },
        publisher: { '@type': 'Organization', name: 'Bloemstraat Garden' },
        ...(article.articleImage?.url && {
          image: article.articleImage.url,
        }),
      }
    : null;

  return (
    <main role="main">
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <BlogPostClient>
        <BlogPostDetail slug={slug} />
      </BlogPostClient>
    </main>
  );
}

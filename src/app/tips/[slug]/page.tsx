import type { Metadata } from "next";
import TipsPageClient from "@/components/TipsPageClient";
import TipPostDetail from "@/components/features/tips/TipPostDetail";
import { fetchTips } from "@/lib/api/contentful/client-cdn";

interface TipsPageParams {
  slug: string;
}

interface TipsPageProps {
  params: Promise<TipsPageParams>;
}

async function getTipBySlug(slug: string) {
  const { items } = await fetchTips(100, 0);
  return items.find((tip) => tip.slug === slug) ?? null;
}

export async function generateMetadata({ params }: TipsPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tip = await getTipBySlug(slug);

  if (!tip) {
    return {
      title: 'Moestuin Tips - Bloemstraat Garden',
      description: 'Lees onze moestuin tips',
    };
  }

  return {
    title: `${tip.title} | Bloemstraat Garden`,
    description: tip.summary,
    openGraph: {
      title: tip.title,
      description: tip.summary,
      type: 'article',
      publishedTime: tip.date,
      ...(tip.articleImage?.url && {
        images: [{ url: tip.articleImage.url, alt: tip.title }],
      }),
    },
  };
}

export default async function TipsPage({ params }: TipsPageProps) {
  const { slug } = await params;
  const tip = await getTipBySlug(slug);

  const jsonLd = tip
    ? {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: tip.title,
        description: tip.summary,
        datePublished: tip.date,
        author: { '@type': 'Organization', name: 'Bloemstraat Garden' },
        publisher: { '@type': 'Organization', name: 'Bloemstraat Garden' },
        ...(tip.articleImage?.url && {
          image: tip.articleImage.url,
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
      <TipsPageClient>
        <TipPostDetail slug={slug} />
      </TipsPageClient>
    </main>
  );
}

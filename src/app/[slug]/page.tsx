import type { Metadata } from "next";
import BlogPostClient from "@/components/BlogPostClient";
import BlogPostDetail from "@/components/features/blog/BlogPostDetail";

interface ArticlePageParams {
  slug: string;
}

interface ArticlePageProps {
  params: ArticlePageParams;
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = params;

  const formattedTitle = slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return {
    title: `${formattedTitle} | Bloemstraat Garden`,
    description: `Lees meer over ${formattedTitle.toLowerCase()} in onze moestuin blog`,
  };
}

export default async function KnowledgeArticlePage({ params }: ArticlePageProps) {
  const { slug } = params;

  return (
    <main role="main">
      <BlogPostClient>
        <BlogPostDetail slug={slug} />
      </BlogPostClient>
    </main>
  );
}
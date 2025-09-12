import type { Metadata } from "next";
import BlogPostClient from "@/components/BlogPostClient";
import BlogPostDetail from "@/components/features/blog/BlogPostDetail";

// Types
interface ArticlePageParams {
  slug: string;
}

interface ArticlePageProps {
  params: Promise<ArticlePageParams>;
}

// Generate metadata for each article page
export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  
  // Capitalize first letter and replace hyphens with spaces for better title
  const formattedTitle = slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  
  return {
    title: `${formattedTitle} | Bloemstraat Garden`,
    description: `Lees meer over ${formattedTitle.toLowerCase()} in onze moestuin blog`,
  };
}

// Static params generation - disabled for now since we're using Apollo
export async function generateStaticParams(): Promise<ArticlePageParams[]> {
  return [];
}

export default async function KnowledgeArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  
  return (
    <main role="main">
      <BlogPostClient>
        <BlogPostDetail slug={slug} />
      </BlogPostClient>
    </main>
  );
}
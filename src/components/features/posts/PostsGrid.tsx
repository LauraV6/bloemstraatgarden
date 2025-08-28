import { getAllArticles } from "@/lib/contentful/api";
import PostsMap from "./PostsMap";

// Types
interface ArticleImage {
  url: string;
  title?: string;
}

interface Article {
  sys: {
    id: string;
  };
  slug: string;
  title: string;
  date: string;
  summary: string;
  articleImage: ArticleImage;
}

interface PostsGridProps {
  className?: string;
  limit?: number;
}

// Error boundary component
const PostsGridError: React.FC<{ error?: string }> = ({ error }) => (
  <div className="posts-error" role="alert">
    <p>Er is een fout opgetreden bij het laden van de artikelen.</p>
    {error && process.env.NODE_ENV === 'development' && (
      <details>
        <summary>Fout details (alleen zichtbaar in development)</summary>
        <pre>{error}</pre>
      </details>
    )}
  </div>
);

// Loading fallback component
const PostsGridEmpty: React.FC = () => (
  <div className="posts-empty" role="status">
    <p>Geen artikelen beschikbaar op dit moment.</p>
  </div>
);

export default async function PostsGrid({ 
  className,
  limit 
}: PostsGridProps = {}) {
  try {
    const articles: Article[] = await getAllArticles();
    
    // Handle empty articles
    if (!articles || articles.length === 0) {
      return <PostsGridEmpty />;
    }

    // Apply limit if specified
    const limitedArticles = limit ? articles.slice(0, limit) : articles;

    return (
      <PostsMap 
        articles={limitedArticles} 
        className={className}
      />
    );
  } catch (error) {
    console.error('Error loading articles in PostsGrid:', error);
    
    return (
      <PostsGridError 
        error={error instanceof Error ? error.message : String(error)} 
      />
    );
  }
}
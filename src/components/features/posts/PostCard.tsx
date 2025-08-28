import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/utils/DateFormatter";
import styles from './postCard.module.scss';

// Types
interface ArticleImage {
  url: string;
  title?: string;
}

interface PostData {
  slug: string;
  title: string;
  summary: string;
  date: string;
  articleImage: ArticleImage;
}

interface PostCardProps {
  props: PostData;
  url?: string;
  className?: string;
  priority?: boolean;
}

// Utility functions
const generatePostUrl = (slug: string, baseUrl?: string): string => {
  return baseUrl ? `${baseUrl}/${slug}` : `/${slug}`;
};

const truncateSummary = (summary: string, maxLength: number = 170): string => {
  if (!summary) return '';
  return summary.length > maxLength 
    ? `${summary.substring(0, maxLength).trim()}...`
    : summary;
};

// Components
interface PostImageProps {
  src: string;
  alt: string;
  title?: string;
}

interface ExtendedPostImageProps extends PostImageProps {
  priority?: boolean;
}

const PostImage: React.FC<ExtendedPostImageProps> = ({ src, alt, title, priority = false }) => (
  <div className={styles.postItem__img}>
    <Image 
      priority={priority}
      src={src} 
      alt={alt}
      fill 
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      style={{ objectFit: 'cover' }}
      title={title}
      loading={priority ? 'eager' : 'lazy'}
    />      
  </div>
);

interface PostContentProps {
  title: string;
  summary: string;
  date: string;
}

const PostContent: React.FC<PostContentProps> = ({ title, summary, date }) => (
  <div className={styles.postItem__content}>
    <h2>{title}</h2>
    <p>{truncateSummary(summary)}</p>
    <time 
      dateTime={date} 
      className={styles.date}
      title={`Gepubliceerd op ${formatDate(date)}`}
    >
      {formatDate(date)}
    </time>
  </div>
);

export const PostCard: React.FC<PostCardProps> = ({ 
  props, 
  url, 
  className,
  priority = false 
}) => {
  // Generate the post URL
  const postUrl = generatePostUrl(props.slug, url);
  
  // Combine CSS classes
  const cardClass = [
    styles.postItem, 
    styles.active, 
    className
  ].filter(Boolean).join(' ');

  // Prepare image alt text
  const imageAlt = props.articleImage.title || props.title;

  return (
    <article className={cardClass}>
      <Link 
        href={postUrl}
        aria-label={`Lees meer over: ${props.title}`}
        className={styles.postLink}
      >
        <PostImage
          src={props.articleImage.url}
          alt={imageAlt}
          title={props.articleImage.title}
          priority={priority}
        />
        
        <PostContent
          title={props.title}
          summary={props.summary}
          date={props.date}
        />
      </Link>
    </article>
  );
};
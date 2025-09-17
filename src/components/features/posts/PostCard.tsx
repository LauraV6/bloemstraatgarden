'use client';

import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/utils/DateFormatter";
import { PostCardContainer, PostLink, PostImageContainer, PostContent, DateBadge } from './PostCard.styled';

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
  if (!summary) return '..';
  if (summary.length > maxLength) {
    return `${summary.substring(0, maxLength).trim()}...`;
  }
  // Add dots to shorter summaries for consistency
  return summary.endsWith('.') ? `${summary}.` : `${summary}..`;
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
  <PostImageContainer>
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
  </PostImageContainer>
);

interface PostContentProps {
  title: string;
  summary: string;
  date: string;
}

const PostContentComponent: React.FC<PostContentProps> = ({ title, summary, date }) => (
  <PostContent>
    <h2>{title}</h2>
    <p>{truncateSummary(summary)}</p>
    <DateBadge 
      dateTime={date} 
      title={`Gepubliceerd op ${formatDate(date)}`}
    >
      {formatDate(date)}
    </DateBadge>
  </PostContent>
);

export const PostCard: React.FC<PostCardProps> = ({ 
  props, 
  url, 
  className,
  priority = false 
}) => {
  const postUrl = generatePostUrl(props.slug, url);

  const imageAlt = props.articleImage.title || `Afbeelding bij artikel: ${props.title}`;

  return (
    <PostCardContainer className={className} isActive={true}>
      <PostLink 
        as={Link}
        href={postUrl}
        aria-label={`Lees meer over: ${props.title}`}
      >
        <PostImage
          src={props.articleImage.url}
          alt={imageAlt}
          title={props.articleImage.title}
          priority={priority}
        />
        
        <PostContentComponent
          title={props.title}
          summary={props.summary}
          date={props.date}
        />
      </PostLink>
    </PostCardContainer>
  );
};
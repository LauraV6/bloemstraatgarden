import type { SystemFields, ArticleImage, RichTextContent } from '@/types/api/contentful';

export interface Article {
  sys: SystemFields;
  title: string;
  slug: string;
  summary: string;
  weather?: string;
  details: RichTextContent;
  date: string;
  articleImage: ArticleImage;
}
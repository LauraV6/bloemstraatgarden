import type { SystemFields, ArticleImage, RichTextContent } from '@/types/api/contentful';

export interface Tip {
  sys: SystemFields;
  title: string;
  slug: string;
  summary: string;
  details: RichTextContent;
  date: string;
  articleImage: ArticleImage;
}
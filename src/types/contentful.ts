// Re-export all types for backward compatibility
// New code should import from specific feature folders

export type { 
  SystemFields, 
  ArticleImage, 
  AssetBlock, 
  RichTextLinks, 
  RichTextContent 
} from './api/contentful';

export type { Article } from './features/blog';
export type { Tip } from './features/tips';
export type { Verkrijgbaar } from './features/products';
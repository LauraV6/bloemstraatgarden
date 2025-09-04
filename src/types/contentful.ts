import type { Document } from "@contentful/rich-text-types";

export interface SystemFields {
  id: string;
}

export interface ArticleImage {
  url: string;
  title?: string;
}

export interface AssetBlock {
  __typename: string;
  title: string;
  url: string;
  sys: SystemFields;
}

export interface RichTextLinks {
  assets: {
    block: AssetBlock[];
  };
}

export interface RichTextContent {
  json: Document;
  links: RichTextLinks;
}

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

export interface Tip {
  sys: SystemFields;
  title: string;
  slug: string;
  summary: string;
  details: RichTextContent;
  date: string;
  articleImage: ArticleImage;
}

export interface Verkrijgbaar {
  sys: SystemFields;
  title: string;
  amount: string;
  date: string;
  postImage: {
    url: string;
  };
}
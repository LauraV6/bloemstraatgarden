import type { Document } from "@contentful/rich-text-types";

// Base Contentful types
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
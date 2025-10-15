// Alternative Contentful client using CDN API instead of GraphQL
import type { Article, Tip } from '@/types/contentful';

// Contentful CDN API Response Types
interface ContentfulAsset {
  sys: { id: string };
  fields: {
    file: { url: string };
    title?: string;
  };
}

interface ContentfulEntry<T = Record<string, unknown>> {
  sys: { id: string };
  fields: T;
}

interface ContentfulResponse<T = Record<string, unknown>> {
  items: ContentfulEntry<T>[];
  includes?: {
    Asset?: ContentfulAsset[];
  };
  total: number;
}

interface FallbackDataResponse<T> {
  items: T[];
  total: number;
}

const SPACE_ID = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
const ACCESS_TOKEN = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;

const CDN_BASE_URL = `https://cdn.contentful.com/spaces/${SPACE_ID}`;

export async function fetchArticles(limit: number = 10, skip: number = 0): Promise<FallbackDataResponse<Article>> {
  try {
    const url = `${CDN_BASE_URL}/entries?content_type=knowledgeArticle&limit=${limit}&skip=${skip}&order=-fields.date&include=1`;
    
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json() as ContentfulResponse;

    // Transform the CDN response to match GraphQL structure
    const items = data.items?.map((item) => {
      const fields = item.fields as Record<string, unknown>;
      const articleImageRef = fields.articleImage as { sys: { id: string } } | undefined;
      const articleImageAsset = articleImageRef
        ? data.includes?.Asset?.find((a) => a.sys.id === articleImageRef.sys.id)
        : undefined;

      return {
        sys: { id: item.sys.id },
        title: fields.title as string,
        slug: fields.slug as string,
        summary: fields.summary as string,
        date: fields.date as string,
        weather: fields.weather as string | undefined,
        articleImage: articleImageAsset ? {
          url: `https:${articleImageAsset.fields.file.url}`,
          title: articleImageAsset.fields.title
        } : { url: '', title: '' },
        details: fields.details as Article['details']
      } as Article;
    }) || [];
    
    return {
      items,
      total: data.total || 0
    };
  } catch (error) {
    console.error('Error fetching articles from CDN:', error);
    throw error;
  }
}

export async function fetchTips(limit: number = 5, skip: number = 0): Promise<FallbackDataResponse<Tip>> {
  try {
    const url = `${CDN_BASE_URL}/entries?content_type=tips&limit=${limit}&skip=${skip}&order=-sys.createdAt&include=1`;
    
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json() as ContentfulResponse;

    // Transform the CDN response to match GraphQL structure
    const items = data.items?.map((item) => {
      const fields = item.fields as Record<string, unknown>;
      const tipImageRef = fields.tipImage as { sys: { id: string } } | undefined;
      const tipImageAsset = tipImageRef
        ? data.includes?.Asset?.find((a) => a.sys.id === tipImageRef.sys.id)
        : undefined;

      return {
        sys: { id: item.sys.id },
        title: fields.title as string,
        slug: fields.slug as string,
        summary: fields.summary as string,
        date: fields.date as string,
        articleImage: tipImageAsset ? {
          url: `https:${tipImageAsset.fields.file.url}`,
          title: tipImageAsset.fields.title
        } : { url: '', title: '' },
        details: fields.details as Tip['details']
      } as Tip;
    }) || [];
    
    return {
      items,
      total: data.total || 0
    };
  } catch (error) {
    console.error('Error fetching tips from CDN:', error);
    throw error;
  }
}
export interface Tip {
  sys: {
    id: string;
  };
  title: string;
  slug: string;
  excerpt: string;
  publishDate: string;
  postImage: {
    url: string;
    title?: string;
  };
  tipDescription: {
    json: Record<string, unknown>;
    links?: {
      assets?: {
        block?: Array<{
          sys: { id: string };
          url: string;
          title: string;
        }>;
      };
    };
  };
}

export interface TipsCollection {
  items: Tip[];
  total: number;
}

export interface TipCardProps {
  tip: Tip;
  className?: string;
}

export interface TipsGridProps {
  tips: Tip[];
  loading?: boolean;
  error?: Error | null;
}
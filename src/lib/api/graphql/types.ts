import type { Article, Tip } from '@/types/contentful';

export interface ArticleCollection {
  knowledgeArticleCollection: {
    total: number;
    items: Article[];
  };
}

export interface TipCollection {
  tipsCollection: {
    total: number;
    items: Tip[];
  };
}

export interface AvailableItem {
  sys: {
    id: string;
  };
  title: string;
  amount: number;
  date: string;
  postImage: {
    url: string;
  };
}

export interface AvailableCollection {
  verkrijgbaarCollection: {
    items: AvailableItem[];
  };
}
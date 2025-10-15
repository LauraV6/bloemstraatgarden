import type { SystemFields } from '@/types/api/contentful';

export interface Verkrijgbaar {
  sys: SystemFields;
  title: string;
  amount: number;
  date: string;
  postImage: {
    url: string;
    title?: string;
  };
}
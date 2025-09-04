import type { SystemFields } from '@/types/api/contentful';

export interface Verkrijgbaar {
  sys: SystemFields;
  title: string;
  amount: string;
  date: string;
  postImage: {
    url: string;
  };
}
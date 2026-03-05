import type { MetadataRoute } from 'next';
import { fetchArticles, fetchTips } from '@/lib/api/contentful/client-cdn';

const BASE_URL = 'https://bloemstraat-garden.nl';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [articlesData, tipsData] = await Promise.all([
    fetchArticles(100, 0),
    fetchTips(100, 0),
  ]);

  const articleEntries: MetadataRoute.Sitemap = articlesData.items.map((article) => ({
    url: `${BASE_URL}/${article.slug}`,
    lastModified: article.date ? new Date(article.date) : new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const tipEntries: MetadataRoute.Sitemap = tipsData.items.map((tip) => ({
    url: `${BASE_URL}/tips/${tip.slug}`,
    lastModified: tip.date ? new Date(tip.date) : new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/verkrijgbaar`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/quiz`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    ...articleEntries,
    ...tipEntries,
  ];
}

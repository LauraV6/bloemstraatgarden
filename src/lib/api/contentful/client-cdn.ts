// Alternative Contentful client using CDN API instead of GraphQL
const SPACE_ID = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
const ACCESS_TOKEN = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;

const CDN_BASE_URL = `https://cdn.contentful.com/spaces/${SPACE_ID}`;

export async function fetchArticles(limit: number = 10, skip: number = 0) {
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
    
    const data = await response.json();
    
    // Transform the CDN response to match GraphQL structure
    const items = data.items?.map((item: any) => ({
      sys: { id: item.sys.id },
      title: item.fields.title,
      slug: item.fields.slug,
      summary: item.fields.summary,
      date: item.fields.date,
      weather: item.fields.weather,
      articleImage: item.fields.articleImage ? {
        url: `https:${data.includes?.Asset?.find((a: any) => a.sys.id === item.fields.articleImage.sys.id)?.fields?.file?.url}`,
        title: data.includes?.Asset?.find((a: any) => a.sys.id === item.fields.articleImage.sys.id)?.fields?.title
      } : null,
      details: item.fields.details
    })) || [];
    
    return {
      items,
      total: data.total || 0
    };
  } catch (error) {
    console.error('Error fetching articles from CDN:', error);
    throw error;
  }
}

export async function fetchTips(limit: number = 5, skip: number = 0) {
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
    
    const data = await response.json();
    
    // Transform the CDN response to match GraphQL structure
    const items = data.items?.map((item: any) => ({
      sys: { id: item.sys.id },
      title: item.fields.title,
      slug: item.fields.slug,
      summary: item.fields.summary,
      tipImage: item.fields.tipImage ? {
        url: `https:${data.includes?.Asset?.find((a: any) => a.sys.id === item.fields.tipImage.sys.id)?.fields?.file?.url}`,
        title: data.includes?.Asset?.find((a: any) => a.sys.id === item.fields.tipImage.sys.id)?.fields?.title
      } : null,
      details: item.fields.details
    })) || [];
    
    return {
      items,
      total: data.total || 0
    };
  } catch (error) {
    console.error('Error fetching tips from CDN:', error);
    throw error;
  }
}
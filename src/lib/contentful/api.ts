// Type definitions for Contentful API responses
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
  json: any; // This is the raw JSON from Contentful Rich Text
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

interface GraphQLResponse<T> {
  data?: T;
  errors?: Array<{
    message: string;
    extensions?: Record<string, any>;
  }>;
}

interface ArticleCollection {
  knowledgeArticleCollection: {
    items: Article[];
  };
}

interface TipsCollection {
  tipsCollection: {
    items: Tip[];
  };
}

const ARTICLE_GRAPHQL_FIELDS = `
  sys {
    id
  }
  title
  slug
  summary
  weather
  details {
    json
    links {
      assets {
        block {
          __typename
          title
          url
          sys {
            id
          }
        }
      }
    }
  }
  date
  articleImage {
    url
  }
`;

const TIP_GRAPHQL_FIELDS = `
  sys {
    id
  }
  title
  slug
  summary
  details {
    json
    links {
      assets {
        block {
          __typename
          title
          url
          sys {
            id
          }
        }
      }
    }
  }
  date
  articleImage {
    url
  }
`;

async function fetchGraphQL<T = any>(query: string): Promise<GraphQLResponse<T>> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
  
  try {
    const response = await fetch(
      `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
        },
        body: JSON.stringify({ query }),
        signal: controller.signal,
        next: { revalidate: 60 } // Cache for 60 seconds
      }
    );
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}, statusText: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    if (data.errors) {
      throw new Error(`GraphQL errors: ${JSON.stringify(data.errors)}`);
    }
    
    return data;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === 'AbortError') {
      console.error('Contentful API request timed out after 10 seconds');
      throw new Error('API request timed out. Please try again later.');
    }
    throw error;
  }
}

function extractArticleEntries(fetchResponse: GraphQLResponse<ArticleCollection>): Article[] | undefined {
  return fetchResponse?.data?.knowledgeArticleCollection?.items;
}

function extractTipsEntries(fetchResponse: GraphQLResponse<TipsCollection>): Tip[] | undefined {
  return fetchResponse?.data?.tipsCollection?.items;
}

export async function getAllArticles(): Promise<Article[]> {
  try {
    const articles = await fetchGraphQL<ArticleCollection>(
      `query {
          knowledgeArticleCollection(limit: 100, where:{slug_exists: true}, order: date_DESC) {
            items {
              ${ARTICLE_GRAPHQL_FIELDS}
            }
          }
        }`,
    );
    return extractArticleEntries(articles) || [];
  } catch (error) {
    console.error('Error fetching articles:', error);
    return []; // Return empty array as fallback
  }
}

export async function getArticle(slug: string): Promise<Article | undefined> {
  const article = await fetchGraphQL<ArticleCollection>(
    `query {
        knowledgeArticleCollection(where:{slug: "${slug}"}, limit: 100) {
          items {
            ${ARTICLE_GRAPHQL_FIELDS}
          }
        }
      }`,
  );
  const entries = extractArticleEntries(article);
  return entries ? entries[0] : undefined;
}

export async function getAllTips(): Promise<Tip[]> {
  try {
    const tips = await fetchGraphQL<TipsCollection>(
      `query {
          tipsCollection(where:{slug_exists: true}, order: date_DESC, limit: 5) {
            items {
              ${TIP_GRAPHQL_FIELDS}
            }
          }
        }`,
    );
    return extractTipsEntries(tips) || [];
  } catch (error) {
    console.error('Error fetching tips:', error);
    return []; // Return empty array as fallback
  }
}

export async function getTip(slug: string): Promise<Tip | undefined> {
  const tip = await fetchGraphQL<TipsCollection>(
    `query {
        tipsCollection(where:{slug: "${slug}"}, limit: 5) {
          items {
            ${TIP_GRAPHQL_FIELDS}
          }
        }
      }`,
  );
  const entries = extractTipsEntries(tip);
  return entries ? entries[0] : undefined;
}
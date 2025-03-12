// Set a variable that contains all the fields needed for articles when a fetch for
// content is performed
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

async function fetchGraphQL(query, preview = false) {
  return fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Switch the Bearer token depending on whether the fetch is supposed to retrieve live
        // Contentful content or draft content
        Authorization: `Bearer ${
          preview
            ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
            : process.env.CONTENTFUL_ACCESS_TOKEN
        }`,
      },
      body: JSON.stringify({ query }),
      // Associate all fetches for articles with an "articles" cache tag so content can
      // be revalidated or updated from Contentful on publish
      next: { tags: ["articles", "tips"] },
    }
  ).then((response) => response.json());
}

function extractArticleEntries(fetchResponse) {
  return fetchResponse?.data?.knowledgeArticleCollection?.items;
}

function extractTipsEntries(fetchResponse) {
  return fetchResponse?.data?.tipsCollection?.items;
}

export async function getAllArticles(
  // For this demo set the default limit to always return 3 articles.
  limit = 3,
  // By default this function will return published content but will provide an option to
  // return draft content for reviewing articles before they are live
  isDraftMode = false
) {
  const articles = await fetchGraphQL(
    `query {
        knowledgeArticleCollection(where:{slug_exists: true}, order: date_DESC, limit: ${limit}, preview: ${
      isDraftMode ? "true" : "false"
    }) {
          items {
            ${ARTICLE_GRAPHQL_FIELDS}
          }
        }
      }`,
    isDraftMode
  );
  return extractArticleEntries(articles);
}

export async function getArticle(
  slug,
  isDraftMode = false
) {
  const article = await fetchGraphQL(
    `query {
        knowledgeArticleCollection(where:{slug: "${slug}"}, limit: 5, preview: ${
      isDraftMode ? "true" : "false"
    }) {
          items {
            ${ARTICLE_GRAPHQL_FIELDS}
          }
        }
      }`,
    isDraftMode
  );
  return extractArticleEntries(article)[0];
}

export async function getAllTips(
  // For this demo set the default limit to always return 3 articles.
  limit = 5,
  // By default this function will return published content but will provide an option to
  // return draft content for reviewing articles before they are live
  isDraftMode = false
) {
  const tips = await fetchGraphQL(
    `query {
        tipsCollection(where:{slug_exists: true}, order: date_DESC, limit: ${limit}, preview: ${
      isDraftMode ? "true" : "false"
    }) {
          items {
            ${TIP_GRAPHQL_FIELDS}
          }
        }
      }`,
    isDraftMode
  );
  return extractTipsEntries(tips);
}

export async function getTip(
  slug,
  isDraftMode = false
) {
  const tip = await fetchGraphQL(
    `query {
        tipsCollection(where:{slug: "${slug}"}, limit: 5, preview: ${
      isDraftMode ? "true" : "false"
    }) {
          items {
            ${TIP_GRAPHQL_FIELDS}
          }
        }
      }`,
    isDraftMode
  );
  return extractTipsEntries(tip)[0];
}

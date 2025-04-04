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

async function fetchGraphQL(query) {
  return fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
      },
      body: JSON.stringify({ query }),
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
) {
  const articles = await fetchGraphQL(
    `query {
        knowledgeArticleCollection(limit: 10, where:{slug_exists: true}, order: date_DESC) {
          items {
            ${ARTICLE_GRAPHQL_FIELDS}
          }
        }
      }`,
  );
  return extractArticleEntries(articles);
}

export async function getArticle(
  slug,
) {
  const article = await fetchGraphQL(
    `query {
        knowledgeArticleCollection(where:{slug: "${slug}"}, limit: 10) {
          items {
            ${ARTICLE_GRAPHQL_FIELDS}
          }
        }
      }`,
  );
  return extractArticleEntries(article)[0];
}

export async function getAllTips(
) {
  const tips = await fetchGraphQL(
    `query {
        tipsCollection(where:{slug_exists: true}, order: date_DESC, limit: 5) {
          items {
            ${TIP_GRAPHQL_FIELDS}
          }
        }
      }`,
  );
  return extractTipsEntries(tips);
}

export async function getTip(
  slug
) {
  const tip = await fetchGraphQL(
    `query {
        tipsCollection(where:{slug: "${slug}"}, limit: 5) {
          items {
            ${TIP_GRAPHQL_FIELDS}
          }
        }
      }`,
  );
  return extractTipsEntries(tip)[0];
}

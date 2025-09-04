import { gql } from '@apollo/client';

export const GET_ALL_ARTICLES = gql`
  query GetAllArticles($limit: Int = 10, $skip: Int = 0) {
    knowledgeArticleCollection(limit: $limit, skip: $skip, order: date_DESC) {
      total
      items {
        sys {
          id
        }
        title
        slug
        summary
        weather
        date
        articleImage {
          url
          title
        }
        details {
          json
          links {
            assets {
              block {
                sys {
                  id
                }
                title
                url
              }
            }
          }
        }
      }
    }
  }
`;

export const GET_ARTICLE_BY_SLUG = gql`
  query GetArticleBySlug($slug: String!) {
    knowledgeArticleCollection(where: { slug: $slug }, limit: 1) {
      items {
        sys {
          id
        }
        title
        slug
        summary
        weather
        date
        articleImage {
          url
          title
        }
        details {
          json
          links {
            assets {
              block {
                sys {
                  id
                }
                title
                url
              }
            }
          }
        }
      }
    }
  }
`;
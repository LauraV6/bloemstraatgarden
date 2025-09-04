import { gql } from '@apollo/client';

export const GET_ALL_TIPS = gql`
  query GetAllTips($limit: Int = 10, $skip: Int = 0) {
    tipsCollection(limit: $limit, skip: $skip, order: date_DESC) {
      total
      items {
        sys {
          id
        }
        title
        slug
        summary
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

export const GET_TIP_BY_SLUG = gql`
  query GetTipBySlug($slug: String!) {
    tipsCollection(where: { slug: $slug }, limit: 1) {
      items {
        sys {
          id
        }
        title
        slug
        summary
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
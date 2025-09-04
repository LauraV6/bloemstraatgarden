import { gql } from '@apollo/client';

export const GET_AVAILABLE_ITEMS = gql`
  query GetAvailableItems {
    verkrijgbaarCollection(order: date_DESC, limit: 100) {
      items {
        sys {
          id
        }
        title
        amount
        date
        postImage {
          url
        }
      }
    }
  }
`;
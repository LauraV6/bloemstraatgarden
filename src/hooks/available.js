import { useStaticQuery, graphql } from 'gatsby';

export default function useAvailable() {
  const data = useStaticQuery(graphql`
    query {
        allContentfulVerkrijgbaar {
            totalCount
            edges {
                node {
                    title
                    availableimage {
                        url
                        id
                        title
                    }
                    date
                    amount
                }
            }
            totalCount
        }
    }
  `);

  const available = data.allContentfulVerkrijgbaar;

  return {
    available
  }
}
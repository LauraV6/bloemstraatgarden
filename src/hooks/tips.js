import { useStaticQuery, graphql } from 'gatsby';

export default function useAllTips() {
  const data = useStaticQuery(graphql`
    query {
        allContentfulTips(sort: {publishdate: DESC}) {
            edges {
              node {
                slug
                title
                publishdate(formatString: "Do MMM, YYYY")
                body {
                  raw
                }
                featuredimage {
                  url
                  title
                }
              }
            }
        }
    }
  `);

  const tips = data.allContentfulTips.edges;

  return {
    tips
  }
}
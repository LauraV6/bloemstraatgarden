import { useStaticQuery, graphql } from 'gatsby';

export default function useAllPosts() {
  const data = useStaticQuery(graphql`
    query {
        allContentfulBlogPost(sort: {publishedDate: DESC}) {
            edges {
              node {
                id
                slug
                title
                description {
                    description
                }
                contentfulinternal
                subject
                id
                publishedDate(formatString: "Do MMM, YYYY")
                featuredimage {
                  id
                  url
                  title
                }
                body {
                    raw
                                             
                }                   
              }
            }
        }
    }
  `);

  const allposts = data.allContentfulBlogPost.edges;

  return {
    allposts
  }
}
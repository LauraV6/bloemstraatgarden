import React from 'react';
import { Link, graphql, useStaticQuery } from 'gatsby'

const MorePosts = () => {
    const data = useStaticQuery(graphql`
        query {
            allContentfulBlogPost(sort: {contentful_id: ASC}) {
                edges {
                    node {
                        slug
                        id
                        title
                        publishedDate(formatString: "Do MMM, YYYY")
                        featuredimage {
                            id
                            url
                        }
                    }
                }
            }
            contentfulBlogPost {
                id
            }          
        }
    `)   
    return (
        <div className='more-posts'>
            <h3>Bekijk meer posts over onze tuin</h3>
            <div className='more-posts__container'>
                <div className='post-items'>
                    {data.allContentfulBlogPost.edges.slice(0, 3).map((edge, index) => {
                        return (
                            <div className='post-item' key={index}>
                                <Link to={`/blog/${edge.node.slug}`}>
                                    <img src={edge.node.featuredimage.url} alt={edge.node.title} />
                                    <h2>{edge.node.title}</h2>
                                    <p>{edge.node.publishedDate}</p>                                   
                                </Link>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default MorePosts
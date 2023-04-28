import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import Layout from '../components/layout'
import PostCard from '../components/postCard'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Helmet } from 'react-helmet'

const BlogPage = () => {
    const data = useStaticQuery(graphql`
        query {
            allContentfulBlogPost(sort: {publishedDate: DESC}) {
                edges {
                  node {
                    id
                    slug
                    title
                    contentfulinternal
                    id
                    publishedDate(formatString: "Do MMM, YYYY")
                    featuredimage {
                      id
                      url
                    }
                    body {
                        raw                         
                    }                   
                  }
                }
            }
            site {
                siteMetadata {
                    title
                }
            }
        }
    `);
    const [searchTerm, setSearchTerm] = useState('');
    const allPosts = data.allContentfulBlogPost.edges;
    return (
        <Layout>
            <Helmet>
                <title>{data.site.siteMetadata.title}</title>
            </Helmet>
            <main>
                <div className='searchbar'>
                    <input className='searchbar__input' type="text" placeholder="Zoeken..." onChange={event => {setSearchTerm(event.target.value)}}></input>
                    <FontAwesomeIcon icon={faSearch} className='searchbar__icon'/>
                </div>               
                <h1 className='title-line'>
                    <span>Bloemstraat Garden</span>
                </h1>
                <div className='post-items'>
                    {allPosts.filter((edge) => {
                        if(searchTerm === "") {
                            return edge
                        } else if (edge.node.title.toLowerCase().includes(searchTerm.toLowerCase())) {
                            return edge
                        }
                        return null;
                        }).map((edge, key) => {
                        const post = edge.node;
                        return (
                            <PostCard 
                                key={key}
                                slug={post.slug}
                                img={post.featuredimage.url} 
                                alt={post.featuredimage.title} 
                                title={post.title} 
                                publishedDate={post.publishedDate}
                            />
                        )
                    })}
                </div>
            </main>
        </Layout>
    )
}

export default BlogPage
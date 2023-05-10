import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import Layout from '../components/layout'
import PostCard from '../components/postCard'
import HeaderImg from '../images/headerBg.png'
import HeaderLeaveSmall from '../images/headerLeaveSmall.png'
import HeaderLeaveBig from '../images/headerLeaveBig.png'
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
                      title
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
                <section className='hero'>
                    <div className='hero__container'>
                        <div className='hero__text'>
                            <div>
                                <h1>Flowers don't tell, they show</h1>
                                <p>And when they show, they've grown</p>                  
                            </div>
                        </div>
                        <div className='hero__images'>
                            <img src={HeaderLeaveBig} className='leave leave--one'></img>
                            <img src={HeaderLeaveSmall} className='leave leave--two'></img>
                            <img src={HeaderLeaveBig} className='leave leave--three'></img>
                            <img src={HeaderLeaveSmall} className='leave leave--four'></img>
                            <img src={HeaderImg} className='bg-leaves'></img>
                        </div>
                    </div>
                </section>
                <div className='searchbar'>
                    <input className='searchbar__input' type="text" placeholder="Zoeken..." onChange={event => {setSearchTerm(event.target.value)}}></input>
                    <FontAwesomeIcon icon={faSearch} className='searchbar__icon'/>
                </div>  
                <section className='blogs'>             
                    <h2 className='title-line'>
                        <span>Bloemstraat Garden</span>
                    </h2>
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
                            console.log(post.featuredimage.title)
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
                </section>
            </main>
        </Layout>
    )
}

export default BlogPage
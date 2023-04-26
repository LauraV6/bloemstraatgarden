import React from "react";
import Layout from '../components/layout'
import MorePosts from '../components/morePosts'
import Aside from '../components/aside'
import { BLOCKS } from '@contentful/rich-text-types';
import { shuffle } from '../utils/helpers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun, faCloudSun, faCloud, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { graphql, Link } from 'gatsby'
import { renderRichText } from "gatsby-source-contentful/rich-text"
import { Helmet } from 'react-helmet'

export const query = graphql`
    query($slug: String!) {
        contentfulBlogPost(slug: {eq: $slug}) {
            slug
            contentful_id
            title
            contentfulinternal
            publishedDate(formatString: "Do MMMM YYYY")
            featuredimage {
                title
                url
            }
            body {
                raw 
                references {
                    ... on ContentfulAsset {
                      __typename
                      contentful_id
                      title
                      file {
                        url
                      }
                    }
                }
            }
        }

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
    }
`

const options = {
    renderNode: {
        [BLOCKS.EMBEDDED_ASSET]: node => {
            const url = node.data.target.file.url
            const alt = node.data.target.title
            return <img alt={alt} src={url} />
          },
    }
}

const Blog = (props) => {   
    const title = props.data.contentfulBlogPost.title;
    const filteredPosts = props.data.allContentfulBlogPost.edges.filter(post => post.node.title !== title);
    const shuffledPosts = shuffle(filteredPosts).slice(0, 3);
    return (
        <Layout>
             <Helmet>
                <title>Bloemstraat Garden - {props.data.contentfulBlogPost.title}</title>
            </Helmet>           
            <section className="post-hero" style={{ backgroundImage: `url(${props.data.contentfulBlogPost.featuredimage.url})` }}>
                <div className="post-hero__content">
                    <div>
                        <h1>{props.data.contentfulBlogPost.title}</h1>
                        <label>{props.data.contentfulBlogPost.publishedDate}</label>
                    </div>
                    {(() => {
                        if(props.data.contentfulBlogPost.contentfulinternal) {
                            return (
                                <div className="meta">
                                <div>
                                    {(() => {
                                        const weather = props.data.contentfulBlogPost.contentfulinternal.toString();
                                        switch (weather) {
                                        case ['veel zon']:
                                            return <FontAwesomeIcon icon={faSun} />;
                                        case 'halfschaduw':
                                            return <FontAwesomeIcon icon={faCloudSun} />;
                                        case 'schaduw':
                                            return <FontAwesomeIcon icon={faCloud} />;                                   
                                        default:
                                            return <FontAwesomeIcon icon={faSun} />;
                                        }
                                    })()}
                                    <span>{props.data.contentfulBlogPost.contentfulinternal}</span>
                                </div>
                            </div>
                            )                 
                        }
                    })()}
                </div>
            </section>
            <main className="post-content">
                <div>
                    <div className="breadcrumbs"><Link to='/'>Blog</Link><FontAwesomeIcon icon={faAngleRight} /><span>{props.data.contentfulBlogPost.title}</span></div>
                    <div id={props.data.contentfulBlogPost.slug} className="content">
                        {renderRichText (props.data.contentfulBlogPost.body, options)}
                    </div>
                    <div className='more-posts'>
                        <h3>Bekijk meer posts over onze tuin</h3>
                        <div className='more-posts__container'>
                            <div className='post-items'>
                            {shuffledPosts.map(post => {
                                return <MorePosts title={post.node.title} slug={post.node.slug} featuredimage={post.node.featuredimage.url} publishedDate={post.node.publishedDate} />;
                            })}
                            </div>
                        </div>
                    </div>
                </div>
                <Aside />
            </main>
        </Layout>
    )
}

export default Blog
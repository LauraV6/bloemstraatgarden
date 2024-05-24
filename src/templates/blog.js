import React from "react";
import Layout from '../components/layout/layout'
import Sidebar from '../components/layout/sidebar'
import Weather from '../components/weather'
import { BLOCKS } from '@contentful/rich-text-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { graphql, Link } from 'gatsby'
import { renderRichText } from "gatsby-source-contentful/rich-text"
import { Helmet } from 'react-helmet'
import MorePosts from "../components/posts/morePosts";
import ProgressBar from "../components/progressbar";

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
    const post = props.data.contentfulBlogPost;

    return (
        <Layout>
            <Helmet>
                <title>Bloemstraat Garden - {post.title}</title>
            </Helmet>    
            <main>   
                <ProgressBar /> 
                <section className="hero post-hero" style={{ backgroundImage: `url(${post.featuredimage.url})` }}>
                    <div className="post-hero__content">
                        <div>
                            <h1>{post.title}</h1>
                            <label>{post.publishedDate}</label>
                        </div>
                        <Weather weatherType={post.contentfulinternal} />
                    </div>
                </section>
                <section className="post-content">
                    <div>
                        <div className="breadcrumbs"><Link to='/'>Blog</Link><FontAwesomeIcon icon={faAngleRight} /><span>{post.title}</span></div>
                        <div className={post.title === 'Moestuin schema' ? 'content schema' : 'content'}>
                            {renderRichText (post.body, options)}
                        </div>
                        <MorePosts />
                    </div>
                    <Sidebar />
                </section>
            </main>  
        </Layout>
    )
}

export const query = graphql`
    query($slug: String!) {
        contentfulBlogPost(slug: {eq: $slug}) {
            slug
            contentful_id
            title
            description {
                description
            }
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
    }
`

export default Blog
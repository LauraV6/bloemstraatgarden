import React from "react";
import Layout from '../components/layout'
import MorePosts from '../components/morePosts'
import Aside from '../components/aside'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun, faCloudSun, faCloud } from '@fortawesome/free-solid-svg-icons'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
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
            }
        }
    }
`

const Blog = (props) => {   
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
                    <div className={`content ${props.data.contentfulBlogPost.slug}`} >
                        {renderRichText (props.data.contentfulBlogPost.body)}
                    </div>
                    <MorePosts />
                </div>
                <Aside />
            </main>
        </Layout>
    )
}

export default Blog
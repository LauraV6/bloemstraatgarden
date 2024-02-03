import React from "react";
import Layout from '../components/layout'
import Sidebar from '../components/sidebar'
import Weather from '../components/weather'
import { BLOCKS } from '@contentful/rich-text-types';
import { shuffle } from '../utils/helpers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { graphql, Link } from 'gatsby'
import { renderRichText } from "gatsby-source-contentful/rich-text"
import { Helmet } from 'react-helmet'
import PostCard from "../components/postCard";

export const query = graphql`
    query {
        contentfulBlogPost {
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

        allContentfulBlogPost(sort: {contentful_id: ASC}) {
            edges {
                node {
                    slug
                    id
                    title
                    description {
                        description
                    }
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
    const allPosts = props.data.allContentfulBlogPost.edges;
    const post = props.data.contentfulBlogPost;

    const title = post.title;
    const headerImg = post.featuredimage.url;
    const publishedDate = post.publishedDate;
    const weatherType = post.contentfulinternal;
    const content = post.body;

    const filteredPosts = allPosts.filter(post => post.node.title !== title);
    const shuffledPosts = shuffle(filteredPosts).slice(0, 3);
    return (
        <Layout>
             <Helmet>
                <title>Bloemstraat Garden - {title}</title>
            </Helmet>           
            <section className="hero post-hero" style={{ backgroundImage: `url(${headerImg})` }}>
                <div className="post-hero__content">
                    <div>
                        <h1>{title}</h1>
                        <label>{publishedDate}</label>
                    </div>
                    <Weather weatherType={weatherType} />
                </div>
            </section>
            <section className="post-content">
                <div>
                    <div className="breadcrumbs"><Link to='/'>Blog</Link><FontAwesomeIcon icon={faAngleRight} /><span>{title}</span></div>
                    <div className="content">
                        {renderRichText (content, options)}
                    </div>
                    <div className='more-posts'>
                        <h3>Bekijk meer posts over onze tuin</h3>
                        <div className='more-posts__container'>
                            <div className='post-items'>
                            {shuffledPosts.map((edge, key) => {
                                const post = edge.node;
                                return <PostCard 
                                            key={key}
                                            slug={post.slug}
                                            img={post.featuredimage.url} 
                                            alt={post.featuredimage.title} 
                                            title={post.title} 
                                            description={post.description.description}
                                            recommend={true}
                                            publishedDate={post.publishedDate}
                                        />;
                            })}
                            </div>
                        </div>
                    </div>
                </div>
                <Sidebar />
            </section>
        </Layout>
    )
}

export default Blog
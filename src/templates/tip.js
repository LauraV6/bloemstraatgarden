import React from "react";
import Layout from '../components/layout'
import Sidebar from '../components/sidebar'
import { BLOCKS } from '@contentful/rich-text-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { graphql, Link } from 'gatsby'
import { renderRichText } from "gatsby-source-contentful/rich-text"
import { Helmet } from 'react-helmet'
import MorePosts from "../components/morePosts";
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

const Tips = (props) => {   
    const post = props.data.contentfulTips;

    return (
        <Layout>
             <Helmet>
                <title>Bloemstraat Garden - {post.title}</title>
            </Helmet>           
            <section className="hero post-hero" style={{ backgroundImage: `url(${post.featuredimage.url})` }}>
                <ProgressBar />
                <div className="post-hero__content">
                    <div>
                        <h1>{post.title}</h1>
                    </div>
                </div>
            </section>
            <section className="post-content">
                <div>
                    <div className="breadcrumbs"><Link to='/'>Blog</Link><FontAwesomeIcon icon={faAngleRight} /><span>{post.title}</span></div>
                    <div className="content">
                        {renderRichText (post.body, options)}
                    </div>
                    <MorePosts />
                </div>
                <Sidebar />
            </section>
        </Layout>
    )
}

export const query = graphql`
    query($slug: String!) {
        contentfulTips(slug: {eq: $slug}) {
            slug
            featuredimage {
              url
              title
            }
            title
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

export default Tips
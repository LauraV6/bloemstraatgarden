import React from 'react'
import { Link, graphql, useStaticQuery } from 'gatsby'
import Layout from '../components/layout'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Helmet } from 'react-helmet'
import '../styles/index.scss'

const BlogPage = () => {
    const data = useStaticQuery(graphql`
        query {
            allContentfulBlogPost(sort: {publishedDate: DESC}) {
                edges {
                  node {
                    title
                    slug
                    publishedDate(formatString: "Do MMM, YYYY")
                    featuredimage {
                      id
                      url
                    }
                  }
                }
            }
        }
    `);
    const [searchTerm, setSearchTerm] = useState('');
    return (
        <Layout>
            <Helmet>
                <title>Bloemstraat Garden</title>
            </Helmet>
            <main>
                <div className='searchbar'>
                    <input className='searchbar__input' type="text" placeholder="Zoeken..." onChange={event => {setSearchTerm(event.target.value)}}></input>
                    <FontAwesomeIcon icon={faSearch} className='searchbar__icon'/>
                </div>               
                <h1 className='title-line'>
                    <span>
                        Bloemstraat Garden
                    </span>
                </h1>
                <div className='post-items'>
                    {data.allContentfulBlogPost.edges.filter((edge) => {
                        if(searchTerm == "") {
                            return edge
                        } else if (edge.node.title.toLowerCase().includes(searchTerm.toLowerCase())) {
                            return edge
                        }
                        }).map((edge, key) => {
                        return (
                            <div className='post-item' key={key}>
                                <Link to={`/blog/${edge.node.slug}`}>
                                    <img src={edge.node.featuredimage.url} alt={edge.node.featuredimage.title} />
                                    <h2>{edge.node.title}</h2>
                                    <p>{edge.node.publishedDate}</p>                                   
                                </Link>
                            </div>
                        )
                    })}
                </div>
            </main>
        </Layout>
    )
}

export default BlogPage
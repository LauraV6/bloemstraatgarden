import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import Layout from '../components/layout'
import PostCard from '../components/postCard'
import HeaderImg from '../images/headerBg.png'
import HeaderLeaveSmall from '../images/headerLeaveSmall.png'
import HeaderLeaveBig from '../images/headerLeaveBig.png'
import { useState, useEffect, useMemo } from 'react'
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

    const PAGE_SIZE = 9;
    const [index , setIndex] = useState(0);
    const [visibleData , setVisibleData] = useState ([]);

    const waveAmount = 9;

    const filteredBlogs = useMemo(() => {
        if (searchTerm !== "") {
            return (allPosts.filter(edge => edge.node.title.toLowerCase().includes(searchTerm.toLowerCase())));
        } else {
            return visibleData;
        }
    });
    
    useEffect(() => {
        const numberOfItems = PAGE_SIZE * ( index + 1 ); 
        const newArray = []; 
            
        for(let i= 0 ;i < allPosts.length ; i++ ){
            if(i < numberOfItems) 
                newArray.push(allPosts[i])
        }
        setVisibleData(newArray);    
    } , [index, allPosts])

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
                                <h1>Bloemstraat Garden</h1>
                                <p>Flowers don't tell, they show</p>                  
                            </div>
                        </div>
                        <div className='hero__images'>
                            <img src={HeaderLeaveBig} className='leave leave--one' alt="leaves"></img>
                            <img src={HeaderLeaveSmall} className='leave leave--two' alt="leaves"></img>
                            <img src={HeaderLeaveBig} className='leave leave--three' alt="leaves"></img>
                            <img src={HeaderLeaveSmall} className='leave leave--four' alt="leaves"></img>
                            <img src={HeaderImg} className='bg-leaves' alt="header-img"></img>
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
                        {filteredBlogs.map((edge, key) => {
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
                    <section className='center p-0'>
                        {(() => {
                            if (index <= 1 && searchTerm === '') {
                                return (
                                    <button className='button button--water' onClick={ () => setIndex (index + 1 )}><span>Geef water voor meer berichten</span>
                                        {
                                            [...Array(waveAmount)].map((e, i) => <div className='wave' key={i}></div>)
                                        }
                                    </button>
                                )
                            }
                            return undefined;
                        })()}
                    </section>
                </section>
            </main>
        </Layout>
    )
}

export default BlogPage
import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import Layout from '../components/layout'
import PostCard from '../components/postCard'
import HeaderImg from '../images/headerBg.png'
import HeaderLeaveSmall from '../images/headerLeaveSmall.png'
import HeaderLeaveBig from '../images/headerLeaveBig.png'
import { useState, useEffect, useMemo } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { Helmet } from 'react-helmet'
import Loader from '../components/loader'

const BlogPage = () => {
    const data = useStaticQuery(graphql`
        query {
            allContentfulBlogPost(sort: {publishedDate: DESC}) {
                edges {
                  node {
                    id
                    slug
                    title
                    description {
                        description
                    }
                    contentfulinternal
                    subject
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

    const pageSize = 9;
    const [index , setIndex] = useState(0);
    const [visibleData , setVisibleData] = useState ([]);

    const categories = [
        'Moestuin',
        'Bouw',
        "Planten",
    ];

    let [categoryFilters, setcategoryFilters] = useState(new Set());

    // Update category selection
    function updateFilters(checked, categoryFilter) {
    if (checked)
        setcategoryFilters((prev) => new Set(prev).add(categoryFilter));
    if (!checked)
        setcategoryFilters((prev) => {
        const next = new Set(prev);
        next.delete(categoryFilter);
        return next;
        });
    }

    // Show results based of filter or no filter
    const filteredBlogs = useMemo(() => {
        const array = new Set(Array.from(categoryFilters));
        const searchFilter = allPosts.filter(edge => edge.node.title.toLowerCase().includes(searchTerm.toLowerCase()));
        if (categoryFilters.size >= 1 && searchTerm !== "") {
            return (searchFilter.filter(edge => array.has(edge.node.subject.toString())));
        } else if (searchTerm !== "") {
            return (searchFilter);
        } else if (categoryFilters.size >= 1) {
            return (allPosts.filter(edge => array.has(edge.node.subject.toString())));
        } else {
            return visibleData;
        }
    });
    
    // Show only first X blog posts
    useEffect(() => {
        const numberOfItems = pageSize * ( index + 1 ); 
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
                <section className='hero' style={{ backgroundImage: `url(${HeaderImg})` }}>
                    <div className='hero__container'>
                        <div className='hero__text'>
                            <div>
                                <h1>Bloemstraat Garden</h1>
                                <p>Ook zelf een moestuin beginnen? Lees in dit blog over onze ervaring, tips and tricks.</p>                  
                            </div>
                        </div>
                        <div className='hero__images'>
                            <img src={HeaderLeaveBig} className='leave leave--one' alt="leaves"></img>
                            <img src={HeaderLeaveSmall} className='leave leave--two' alt="leaves"></img>
                            <img src={HeaderLeaveBig} className='leave leave--three' alt="leaves"></img>
                            <img src={HeaderLeaveSmall} className='leave leave--four' alt="leaves"></img>
                        </div>
                    </div>
                </section>
                <div className='searchbar'>
                    <input className='searchbar__input' type="text" placeholder="Zoeken..." onChange={event => {setSearchTerm(event.target.value)}}></input>
                    <FontAwesomeIcon icon={faSearch} className='searchbar__icon'/>
                </div>  
                <section className='blogs'>
                    <h2 className='title-line'>
                        <span>Blog Updates</span>
                    </h2>
                    <div className='blogs__filter'>
                        <div className='filter-container'>
                            {categories.map((catg, index) => {
                                return (
                                    <button className='filter-item' key={index}>
                                        <input type="checkbox" id={catg} name="category" onChange={(e) => updateFilters(e.target.checked, catg)}/>
                                        <label htmlFor={catg}>{catg}</label>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                    {filteredBlogs.length === 0 && searchTerm === "" ? <Loader /> :
                        (<div className='post-items'>{filteredBlogs.map((edge, key) => {
                            const post = edge.node;
                            return (
                                <PostCard 
                                    key={key}
                                    slug={post.slug}
                                    img={post.featuredimage.url} 
                                    alt={post.featuredimage.title} 
                                    title={post.title} 
                                    description={post.description.description} 
                                    publishedDate={post.publishedDate}
                                />
                            )
                        })}</div>)
                    }
                    <section className='center p-0'>
                        {(() => {
                            if (index <= 0 && searchTerm === "" && categoryFilters.size <= 0) {
                                const waveAmount = 9;
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
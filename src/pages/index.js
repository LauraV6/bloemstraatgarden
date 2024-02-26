import React from 'react'
import { graphql, useStaticQuery, Link } from 'gatsby'
import Layout from '../components/layout'
import PostCard from '../components/postCard'
import TipCard from '../components/tipCard'
import States from '../components/states'
import HeaderImg from '../images/headerBg.png'
import HeaderLeaveSmall from '../images/headerLeaveSmall.png'
import HeaderLeaveBig from '../images/headerLeaveBig.png'
import { useState, useEffect, useMemo } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faArrowRight } from '@fortawesome/free-solid-svg-icons'
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
            allContentfulTips(sort: {publishdate: DESC}) {
                edges {
                  node {
                    slug
                    title
                    publishdate(formatString: "Do MMM, YYYY")
                    body {
                      raw
                    }
                    featuredimage {
                      url
                      title
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
    const allTips = data.allContentfulTips.edges;

    const pageSize = 9;
    const [index , setIndex] = useState(0);
    const [visibleData , setVisibleData] = useState ([]);
    const [numberOfPosts , setNumberOfPosts] = useState ([]);

    const categories = [
        'Moestuin',
        'Bouw',
        "Planten",
    ];

    let [categoryFilters, setcategoryFilters] = useState(new Set());

    // Update category selection
    function updateFilters(checked, categoryFilter) {
        if (checked) {
            setcategoryFilters((prev) => new Set(prev).add(categoryFilter));
        } else {
            setcategoryFilters((prev) => {
                const next = new Set(prev);
                next.delete(categoryFilter);
                return next;
            }); 
        }
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
    }, [allPosts, categoryFilters, searchTerm, visibleData]);
    
    // Show only first X blog posts
    useEffect(() => {
        const numberOfItems = pageSize * ( index + 1 ); 
        const newArray = []; 
            
        for(let i= 0 ;i < allPosts.length ; i++){
            if(i < numberOfItems) 
                newArray.push(allPosts[i])
        }
        setVisibleData(newArray);
        setNumberOfPosts(numberOfItems);
    }, [index, allPosts]);

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
                        (<div className='post-items'>
                            {filteredBlogs.map((edge, key) => {
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
                            })}
                        </div>)
                    }
                    {(() => {
                        if (numberOfPosts < allPosts.length && searchTerm === "" && categoryFilters.size <= 0) {
                            const waveAmount = 9;
                            return (
                                <section className='center p-0'>
                                    <button className='button button--water' onClick={ () => setIndex (index + 1 )}><span>Geef water voor meer berichten</span>
                                        {
                                            [...Array(waveAmount)].map((e, i) => <div className='wave' key={i}></div>)
                                        }
                                    </button>
                                </section>
                            )
                        }
                        return undefined;
                    })()}
                </section>
                <section>
                    <div className='boxing'>
                        <div className='story'>
                            <div className='story__text'>
                                <h3>Gratis voorraad</h3>
                                <p>Het kan voorkomen dat er meer gezaaid wordt dan dat er plek voor is. Deze planten komen op de voorraad lijst te staan.
                                    Meld je aan voor een plant uit de voorraad lijst door mij een bericht te sturen.
                                </p>
                            </div>
                            <div className='story__img'>
                                <Link className='button button--cta' to='/available'>Bekijk onze voorraad <FontAwesomeIcon icon={faArrowRight}/></Link>
                            </div>
                        </div>
                    </div>
                </section>                
                <section>
                    <h2 className='title-line' style={{display: "block"}}>
                        <span>Moestuin tips</span>
                    </h2>
                    <div className='tip-items'>
                        {allTips.map((edge, key) => {
                            const tip = edge.node;
                            return (
                                <TipCard 
                                    key={key}
                                    slug={tip.slug}
                                    img={tip.featuredimage.url} 
                                    alt={tip.featuredimage.title} 
                                    title={tip.title}
                                />
                            )
                        })}
                    </div>
                </section>
                <States />
            </main>
        </Layout>
    )
}

export default BlogPage
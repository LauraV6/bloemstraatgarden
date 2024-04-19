import React from 'react'
import { useState, useEffect, useMemo } from 'react'
import { Helmet } from 'react-helmet'
import { useSiteMetadata } from '../hooks/metadata';
import useAllPosts from '../hooks/allposts';
import Layout from '../components/layout'
import Hero from '../components/hero'
import Tips from '../components/tips';
import StackAnnouncement from '../components/stackAnnouncement'
import States from '../components/states'
import Loader from '../components/loader'
import SearchBar from '../components/searchbar'
import FilteredBlogs from '../components/filteredBlogs'

const BlogPage = () => {
    const { allposts: allPosts } = useAllPosts();
    const { title } = useSiteMetadata();
    const [searchTerm, setSearchTerm] = useState('');
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
                <title>{title}</title>
            </Helmet>
            <main>
                <Hero theme="light" title="Bloemstraat Garden" paragraph="Ook zelf een moestuin beginnen? Lees in dit blog over onze ervaring, tips and tricks." />
                <SearchBar onChange={event => {setSearchTerm(event.target.value)}} />
                <section className='blogs'>
                    <h4 className='title-line'>
                        <span>Blog Updates</span>
                    </h4>
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
                    {filteredBlogs.length === 0 && searchTerm === "" ? <Loader /> : <FilteredBlogs blogList={filteredBlogs} />}
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
                <StackAnnouncement />   
                <Tips />
                <States />
            </main>
        </Layout>
    )
}

export default BlogPage
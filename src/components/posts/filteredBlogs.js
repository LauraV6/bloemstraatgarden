import React from 'react';
import PostCard from './postCard'

const FilteredBlogs = ( {blogList} ) => {
    return (
        <div className='post-items'>
            {blogList.map((edge, key) => {
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
        </div>
    )
}

export default FilteredBlogs
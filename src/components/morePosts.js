import React from 'react';
import { Link } from 'gatsby'

const MorePosts = ( {
    title,
    slug,
    featuredimage,
    publishedDate
} ) => {
    return (
        <div className='post-item'>
            <Link to={`${slug}`}>
                <img src={featuredimage} alt={title} />
                <h2>{title}</h2>
                <p>{publishedDate}</p>                                   
            </Link>
        </div>
    )
}

export default MorePosts
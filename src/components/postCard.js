import React from 'react';
import { Link } from 'gatsby'
import { LazyLoadImage } from "react-lazy-load-image-component";

const PostCard = ({
    slug,
    img,
    alt,
    title,
    publishedDate
}) => {
    return (
                <Link className='post-item' to={`/${slug}`}>
                    <LazyLoadImage src={img} alt={alt} loading="lazy" />
                    <div className='post-item__content'>
                        <h2>{title}</h2>
                        <span>{publishedDate}</span>        
                        <button className='button button--cta'>Lees meer</button>      
                    </div>                       
                </Link>
    )
}

export default PostCard
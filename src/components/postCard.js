import React from 'react';
import { Link } from 'gatsby'
import { LazyLoadImage } from "react-lazy-load-image-component";
import lazyLoadPlaceholder from "../images/lazyLoadPlaceholder.jpg";

const PostCard = ({
    slug,
    img,
    alt,
    title,
    publishedDate
}) => {
    return (
                <Link className='post-item' to={`/${slug}`}>
                    <div className='post-item__img' style={{backgroundImage: `url(${lazyLoadPlaceholder})`}}>
                        <LazyLoadImage src={img} alt={alt} />
                    </div>
                    <div className='post-item__content'>
                        <h2>{title}</h2>
                        <span>{publishedDate}</span>        
                        <button className='button button--cta'>Lees meer</button>      
                    </div>                       
                </Link>
    )
}

export default PostCard
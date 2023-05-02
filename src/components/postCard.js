import React from 'react';
import { Link } from 'gatsby'
import { LazyLoadImage } from "react-lazy-load-image-component";
import LazyLoadPlaceholder from "../images/LazyLoadPlaceholder.jpg";

const PostCard = ({
    slug,
    img,
    alt,
    title,
    publishedDate
}) => {
    return (
                <Link className='post-item' to={`/${slug}`}>
                    <LazyLoadImage src={img} alt={alt} PlaceholderSrc={LazyLoadPlaceholder} />
                    <div className='post-item__content'>
                        <h2>{title}</h2>
                        <span>{publishedDate}</span>        
                        <button className='button button--cta'>Lees meer</button>      
                    </div>                       
                </Link>
    )
}

export default PostCard
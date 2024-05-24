import React from 'react';
import { LazyLoadImage } from "react-lazy-load-image-component";
import lazyLoadPlaceholder from "../../images/lazyLoadPlaceholder.jpg";
import { Link } from 'gatsby'

const PostCard = ({
    slug,
    img,
    alt,
    title,
    description,
    recommend,
    publishedDate
}) => {
    return (
        <Link className={`post-item${recommend === true ? ' recommend' : ''}`} to={`/${slug}`}>
            <div className='post-item__img' style={{backgroundImage: `url(${lazyLoadPlaceholder})`}}>
                <LazyLoadImage src={img} alt={alt} />
            </div>
            <div className='post-item__content'>
                <h2>{title}</h2>
                <p>{description}..</p>
                <span>{publishedDate}</span>   
            </div>                       
        </Link>
    )
}

export default PostCard
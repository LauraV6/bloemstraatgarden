import React from 'react';
import { Link } from 'gatsby'

const PostCard = ({
    slug,
    img,
    alt,
    title,
    publishedDate
}) => {
    return (
                <Link className='post-item' to={`/${slug}`}>
                    <img src={img} alt={alt} />
                    <div className='post-item__content'>
                        <h2>{title}</h2>
                        <span>{publishedDate}</span>        
                        <button className='button button--cta'>Lees meer</button>      
                    </div>                       
                </Link>
    )
}

export default PostCard
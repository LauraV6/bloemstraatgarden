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
            <div className='post-item'>
                <Link to={`/${slug}`}>
                    <img src={img} alt={alt} />
                    <h2>{title}</h2>
                    <p>{publishedDate}</p>                                   
                </Link>
            </div>
    )
}

export default PostCard
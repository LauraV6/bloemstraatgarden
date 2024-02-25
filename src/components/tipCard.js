import React from 'react';
import { Link } from 'gatsby'
import { LazyLoadImage } from "react-lazy-load-image-component";
import lazyLoadPlaceholder from "../images/lazyLoadPlaceholder.jpg";

const TipCard = ({
    slug,
    img,
    alt,
    title,
}) => {
    return (
        <Link className='tip-item' to={`/${slug}`}>
            <div className='tip-item__img' style={{backgroundImage: `url(${lazyLoadPlaceholder})`}}>
                <LazyLoadImage src={img} alt={alt} />
            </div>
            <div className='tip-item__content'>
                <h2>{title}</h2>
                <button className='button button--cta'>Lees meer</button>
            </div>                       
        </Link>
    )
}

export default TipCard
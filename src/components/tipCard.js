import React from 'react';
import { LazyLoadImage } from "react-lazy-load-image-component";
import lazyLoadPlaceholder from "../images/lazyLoadPlaceholder.jpg";
import { Link } from 'gatsby'

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
                <h3>{title}</h3>
                <button className='button button--cta'>Lees meer</button>
            </div>                       
        </Link>
    )
}

export default TipCard
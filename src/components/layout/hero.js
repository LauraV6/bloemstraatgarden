import React from 'react';
import { useRef } from "react";
import HeaderImg from '../../images/headerBgTransparent.png';
import HeaderLeaveSmall from '../../images/headerLeaveSmall.png';
import HeaderLeaveBig from '../../images/headerLeaveBig.png';
import FadeIn from '../animation/fadeIn';

const Hero = ( {theme, title, paragraph}) => {
    const ref = useRef(null);

    return (
        <section className={`hero hero--${theme}`} style={{ backgroundImage: `url(${HeaderImg})` }} ref={ref}>
            <div className='hero__container'>
                <div className='hero__text'>
                    <div>
                        <h1>{title}</h1>
                        <p>{paragraph}</p>                  
                    </div>
                </div>
                <FadeIn className='hero__images'>
                    <img src={HeaderLeaveBig} className='leave leave--one' alt="leaves"></img>
                    <img src={HeaderLeaveSmall} className='leave leave--two' alt="leaves"></img>
                    <img src={HeaderLeaveBig} className='leave leave--three' alt="leaves"></img>
                    <img src={HeaderLeaveSmall} className='leave leave--four' alt="leaves"></img>
                </FadeIn>
            </div>
        </section>
    )
}

export default Hero
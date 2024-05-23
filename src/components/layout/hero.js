import React from 'react';
import { useRef } from "react";
import { useInView } from "framer-motion";
import HeaderImg from '../../images/headerBgTransparent.png'
import HeaderLeaveSmall from '../../images/headerLeaveSmall.png'
import HeaderLeaveBig from '../../images/headerLeaveBig.png'

const Hero = ( {theme, title, paragraph}) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    return (
        <section className={`hero hero--${theme}`} style={{ backgroundImage: `url(${HeaderImg})` }} ref={ref}>
            <div className='hero__container'>
                <div className='hero__text'>
                    <div>
                        <h1>{title}</h1>
                        <p>{paragraph}</p>                  
                    </div>
                </div>
                <div className='hero__images'>
                    <img src={HeaderLeaveBig} className='leave leave--one' alt="leaves"
                    style={{
                        transform: isInView ? "scale(1)" : "scale(.7)",
                        opacity: isInView ? 1 : 0,
                        transition: "all 0.7s cubic-bezier(0.17, 0.55, 0.55, 1) 0.3s"
                    }}></img>
                    <img src={HeaderLeaveSmall} className='leave leave--two' alt="leaves"></img>
                    <img src={HeaderLeaveBig} className='leave leave--three' alt="leaves"></img>
                    <img src={HeaderLeaveSmall} className='leave leave--four' alt="leaves"></img>
                </div>
            </div>
        </section>
    )
}

export default Hero
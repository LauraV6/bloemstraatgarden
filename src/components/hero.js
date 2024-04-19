import React from 'react';
import HeaderImg from '../images/headerBgTransparent.png'
import HeaderLeaveSmall from '../images/headerLeaveSmall.png'
import HeaderLeaveBig from '../images/headerLeaveBig.png'

const Hero = ( {theme, title, paragraph}) => {
    return (
        <section className={`hero hero--${theme}`} style={{ backgroundImage: `url(${HeaderImg})` }}>
            <div className='hero__container'>
                <div className='hero__text'>
                    <div>
                        <h1>{title}</h1>
                        <p>{paragraph}</p>                  
                    </div>
                </div>
                <div className='hero__images'>
                    <img src={HeaderLeaveBig} className='leave leave--one' alt="leaves"></img>
                    <img src={HeaderLeaveSmall} className='leave leave--two' alt="leaves"></img>
                    <img src={HeaderLeaveBig} className='leave leave--three' alt="leaves"></img>
                    <img src={HeaderLeaveSmall} className='leave leave--four' alt="leaves"></img>
                </div>
            </div>
        </section>
    )
}

export default Hero
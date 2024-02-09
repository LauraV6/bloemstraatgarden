import React from 'react';
import { Link } from 'gatsby'
import { useSiteMetadata } from "../hooks/metadata"
import logoSmall from "../images/logoSmall.png";
import HeaderLeaveBig from '../images/headerLeaveBig.png'

const Footer = () => {
    const { author } = useSiteMetadata()
    return (
        <footer className='footer'>
            <div className='footer__adding'>
                <div className='container'>
                    <Link to='/'><img src={logoSmall} alt="logo"></img></Link>
                    <div className='intro'>
                        <p>Bloemstraat Garden is gelegen in Steenwijkerland en richt zich op het leren door te zien, ervaren en kennis te delen van moestuinieren.</p>
                    </div>
                </div>
                <img src={HeaderLeaveBig} className='footer__leave' alt='big-leave'></img>
            </div>
            <div className='footer__copyright'>
                <label>Created by {author} © 2024</label>
            </div>
        </footer>
    )
}

export default Footer
import React from 'react';
import FooterStepOne from '../images/footerStepOne.png'
import FooterStepTwo from '../images/footerStepTwo.png'
import FooterStepThree from '../images/footerStepThree.png'
import HeaderLeaveBig from '../images/headerLeaveBig.png'
import { graphql, useStaticQuery } from 'gatsby'

const Footer = () => {
    const data = useStaticQuery(graphql`
        query {
            site {
                siteMetadata {
                    author
                }
            }
        }
    `)   
    const siteMeta = data.site.siteMetadata;
    const author = siteMeta.author;
    return (
        <footer className='footer'>
            <div className='footer__steps'>
                <div className='container'>
                    <div className='step'>
                        <div className='step__icon'>
                            <img src={FooterStepOne} alt='step-one'></img>
                        </div>
                        <div className='step__text'>
                            <p>Zaden selectie maken</p>
                        </div>
                    </div>
                    <div className='step'>
                        <div className='step__icon'>
                            <img src={FooterStepTwo} alt='step-two'></img>
                        </div>
                        <div className='step__text'>
                            <p>Beste manier van planten</p>
                        </div>
                    </div>
                    <div className='step'>
                        <div className='step__icon'>
                            <img src={FooterStepThree} alt='step-three'></img>
                        </div>
                        <div className='step__text'>
                            <p>Groeien en onderhouden</p>
                        </div>
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
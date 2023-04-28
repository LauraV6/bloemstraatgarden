import React from 'react';
import { Link, graphql, useStaticQuery } from 'gatsby'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import { faWhatsapp, faInstagram, faPinterestP } from '@fortawesome/free-brands-svg-icons'
import logo from "../images/logo.png";
import { Helmet } from 'react-helmet';

const Header = () => {    
    const data = useStaticQuery(graphql`
        query {
            site {
                siteMetadata {
                    author
                    description
                }
            }
        }
    `)     
    const siteMeta = data.site.siteMetadata;
    const author = siteMeta.author;
    const description = siteMeta.description;
    return (
        <>
        <Helmet>
            <meta name="author" content={author}></meta>
            <meta name="description" content={description} />
        </Helmet>
        <header>
            <nav>
                <div className='header-socials'>
                    <a className='header-link share-icon whapp' href="https://api.whatsapp.com/send?text=https://bloemstraatgarden.netlify.app/" data-action="share/whatsapp/share" target="_blank"><FontAwesomeIcon icon={faWhatsapp}/><span>Delen</span></a>
                    <a className='header-link share-icon pinterest' href="https://pin.it/4a6ptov" target="_blank"><FontAwesomeIcon icon={faPinterestP}/><span>Delen</span></a>
                    <a className='header-link share-icon insta' href="https://www.instagram.com/lauravlasma/" target="_blank"><FontAwesomeIcon icon={faInstagram}/><span>Delen</span></a>
                </div>
                <Link to='/' className='logo'><img src={logo} alt="logo"></img></Link>
                <a className='header-link share-contact' href="mailto:lauravlasma2@gmail.com" target="_blank"><FontAwesomeIcon icon={faPaperPlane}/>Contact opnemen</a>
            </nav>
        </header>
        </>
    )
}

export default Header
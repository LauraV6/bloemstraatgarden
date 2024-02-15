import React, { useEffect, useState } from "react";
import { Link } from 'gatsby'
import { useSiteMetadata } from "../hooks/metadata"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolderOpen } from '@fortawesome/free-regular-svg-icons';
import { faWhatsapp, faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons'
import logo from "../images/logo.png";
import logoSmall from "../images/logoSmall.png";
import { Helmet } from 'react-helmet';

const Header = () => {    
    const { author, description } = useSiteMetadata()
    const [small, setSmall] = useState(false);

    useEffect(() => {
      if (typeof window !== "undefined") {
        window.addEventListener("scroll", () =>
          setSmall(window.pageYOffset > 0)
        );
      }
    }, []);
    return (
        <>
        <Helmet>
            <meta name="author" content={author}></meta>
            <meta name="description" content={description} />
        </Helmet>
        <header className={small ? "small" : undefined}>
            <nav>
                <div className='header-socials'>
                    <a className='header-link share-icon whapp' href="https://api.whatsapp.com/send?text=https://bloemstraatgarden.netlify.app/" data-action="share/whatsapp/share" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faWhatsapp}/><span>Delen</span></a>
                    <a className='header-link share-icon linkedin' href="https://www.linkedin.com/in/laura-vlasma-0692b0159/" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faLinkedinIn}/><span>Delen</span></a>
                    <a className='header-link share-icon insta' href="https://www.instagram.com/lauravlasma/" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faInstagram}/><span>Delen</span></a>
                </div>
                <Link to='/' id='logo' className={`logo ${small ? "logo--small" : ""}`}><img src={small ? logoSmall : logo} alt="logo"></img></Link>
                <a className='header-link share-contact' href='https://lauravlasma-portfolio.netlify.app/' target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faFolderOpen}/>Toon portfolio</a>
            </nav>
        </header>
        </>
    )
}

export default Header
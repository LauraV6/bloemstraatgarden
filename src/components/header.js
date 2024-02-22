import React, { useEffect, useState } from "react";
import { Link } from 'gatsby'
import { useSiteMetadata } from "../hooks/metadata"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSeedling } from '@fortawesome/free-solid-svg-icons'
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
                    <a className='button button--cta share-icon whapp' href="https://api.whatsapp.com/send?text=https://bloemstraatgarden.netlify.app/" data-action="share/whatsapp/share" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faWhatsapp}/><span>Delen</span></a>
                    <a className='button button--cta share-icon linkedin' href="https://www.linkedin.com/in/laura-vlasma-0692b0159/" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faLinkedinIn}/><span>Delen</span></a>
                    <a className='button button--cta share-icon insta' href="https://www.instagram.com/lauravlasma/" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faInstagram}/><span>Delen</span></a>
                </div>
                <Link to='/' id='logo' className={`logo ${small ? "logo--small" : ""}`}><img src={small ? logoSmall : logo} alt="logo"></img></Link>
                <Link className='button button--cta share-contact' to='/available/'><FontAwesomeIcon icon={faSeedling}/> Plant voorraad</Link>
            </nav>
        </header>
        </>
    )
}

export default Header
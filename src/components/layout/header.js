import React, { useEffect, useState } from "react";
import { Helmet } from 'react-helmet';
import { useSiteMetadata } from "../../hooks/metadata"
import { motion } from "framer-motion";
import ThemeColor from "../themeColor";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWhatsapp, faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons'
import Logo from "../logo";
import LogoSmall from "../logoSmall";
import { Link } from 'gatsby'

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
            <meta name="author" content={author} />
            <meta name="description" content={description} />
        </Helmet>
        <header className={small ? "small" : undefined}>
            <nav>
                <div className='header-socials'>
                  <motion.a 
                    whileHover={{ scale: [null, 1.2, 1.1], rotate: 10 }}
                    transition={{ duration: .1 }}
                    whileTap={{ rotate: 0 }}
                    className='button button--cta share-icon whapp' href="https://api.whatsapp.com/send?text=https://bloemstraatgarden.netlify.app/" data-action="share/whatsapp/share" target="_blank" rel="noreferrer"
                  >
                    <FontAwesomeIcon icon={faWhatsapp}/><span>Delen</span>
                  </motion.a>
                  <motion.a 
                    whileHover={{ scale: [null, 1.2, 1.1], rotate: -10 }}
                    transition={{ duration: .1 }}
                    whileTap={{ rotate: 0 }}
                    className='button button--cta share-icon linkedin' href="https://www.linkedin.com/in/laura-vlasma-0692b0159/" target="_blank" rel="noreferrer"
                  >
                    <FontAwesomeIcon icon={faLinkedinIn}/><span>Delen</span>
                  </motion.a>

                  <motion.a 
                    whileHover={{ scale: [null, 1.2, 1.1], rotate: 10 }}
                    transition={{ duration: .1 }}
                    whileTap={{ rotate: 0 }}
                    className='button button--cta share-icon insta' href="https://www.instagram.com/lauravlasma/" target="_blank" rel="noreferrer"
                  >       
                    <FontAwesomeIcon icon={faInstagram}/><span>Delen</span>
                  </motion.a>

                </div>
  
                <Link to='/' id='logo' className={`logo ${small ? "logo--small" : ""}`}>{small ? <LogoSmall /> : <Logo />}</Link>
                <ThemeColor />
            </nav>
        </header>
        </>
    )
}

export default Header
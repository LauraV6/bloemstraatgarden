import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import FadeIn from './animation/fadeIn';
import { Link } from 'gatsby';
import { motion } from "framer-motion";

const StackAnnouncement = () => {
    return (
        <section>
            <FadeIn className='boxing' delay={0.3}>
                <div className='story'>
                    <div className='story__text'>
                        <h3>Gratis voorraad</h3>
                        <p>Het kan voorkomen dat er meer gezaaid wordt dan dat er plek voor is. Deze planten komen op de voorraad lijst te staan.
                            Meld je aan voor een plant uit de voorraad lijst door mij een bericht te sturen.
                        </p>
                    </div>
                    <div className='story__img'>
                        <motion.div       
                            whileHover={{ scale: [null, 1.1, 1.05] }}
                            transition={{ duration: 0.3 }}>
                            <Link className='button button--cta' to='/verkrijgbaar'>Bekijk onze voorraad <FontAwesomeIcon icon={faArrowRight}/></Link>
                        </motion.div>
                    </div>
                </div>
            </FadeIn>
        </section> 
    )
}

export default StackAnnouncement
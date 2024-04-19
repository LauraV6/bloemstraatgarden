import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'gatsby';

const StackAnnouncement = () => {
    return (
        <section>
            <div className='boxing'>
                <div className='story'>
                    <div className='story__text'>
                        <h3>Gratis voorraad</h3>
                        <p>Het kan voorkomen dat er meer gezaaid wordt dan dat er plek voor is. Deze planten komen op de voorraad lijst te staan.
                            Meld je aan voor een plant uit de voorraad lijst door mij een bericht te sturen.
                        </p>
                    </div>
                    <div className='story__img'>
                        <Link className='button button--cta' to='/verkrijgbaar'>Bekijk onze voorraad <FontAwesomeIcon icon={faArrowRight}/></Link>
                    </div>
                </div>
            </div>
        </section> 
    )
}

export default StackAnnouncement
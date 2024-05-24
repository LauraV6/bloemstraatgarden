import React from "react";
import { Helmet } from 'react-helmet';
import useAvailable from '../hooks/available';
import Layout from '../components/layout/layout';
import Hero from "../components/layout/hero";
import MorePosts from "../components/posts/morePosts";
import AvailableItem from "../components/order/availableItem";
import zaaiTrays from '../images/zaaitrays.jpg';
import notAvailable from '../images/notAvailable.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'gatsby';
import OrderHeader from "../components/order/orderHeader";

const Verkrijgbaar = () => {
    const { available } = useAvailable(); 

    return (
        <Layout>
            <Helmet>
                <title>Bloemstraat Garden - Planten verkrijgbaar</title>
            </Helmet>
            <main>
                <Hero theme="dark" title="Verkrijgbare planten" paragraph="Bekijk hier de planten die verkrijgbaar zijn bij onze moestuin, deze zijn gratis mee te nemen. Interesse? Stuur mij een bericht via Instagram of Whatsapp." />
                <section>
                    <div className="breadcrumbs"><Link to='/'>Blog</Link><FontAwesomeIcon icon={faAngleRight} /><span>Verkrijgbaar</span></div>                          
                    <div className="story">
                        <div className="story__text">
                            <h2>Overschot</h2>
                            <p>Bij het voorzaaien worden er meerdere zaaitrays in gebruik genomen. Het komt voor dat er een overschot komt van bepaalde planten. 
                            Deze planten worden hier gratis aangeboden om van groter nut te kunnen zijn bij iemand anders.
                            De planten worden in doosjes meegeven en de potjes zullen hergebruikt worden voor het volgende zaai item.</p>
                            <p>Ben je op de hoogte van het zaaischema en zie je er een plant tussen staan die je graag wilt hebben? Stuur dan een persoonlijk bericht.</p>
                        </div>
                        <div className="story__img">
                            <img src={zaaiTrays} alt='bloemstraat-gratis-planten'/>
                        </div>         
                    </div>          
                </section>
                <section>
                    <h2 className='title-line' style={{display: "block"}}>
                        <span>{available.totalCount <= 1 ? 'Beschikbare planten' : `${available.totalCount} beschikbare planten`}</span>
                    </h2>                
                    {available.totalCount === 1 ? (
                        <div className="boxing">
                            <div className="boxing__content">
                                <img className="top-image" src={notAvailable} alt='niet-beschikbaar'/>
                                <h3>Geen planten beschikbaar</h3>
                                <p>Momenteel zijn er geen planten op voorraad. Kom op een later moment terug om te kijken of er weer planten beschikbaar zijn.
                                    Wil je weten wanneer je de meeste kans maakt? Bekijk dan het <Link className="hyperlink" to='/moestuin-schema/'>zaaischema</Link>.
                                </p>
                            </div>
                        </div>
                    ) : (
                        <>
                            <OrderHeader />
                            <div className="post-items">
                                {available.edges.map((edge, key) => {
                                    const post = edge.node;
                                    return (
                                        <AvailableItem key={key} plant={post} />                            
                                    )
                                })}
                            </div>
                        </>
                    )}
                </section>
                <section>
                    <MorePosts bottom="true" />
                </section>       
            </main>
        </Layout>
    )
}

export default Verkrijgbaar
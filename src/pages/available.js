import React from "react";
import { Helmet } from 'react-helmet';
import { shuffle } from '../utils/helpers';
import useAvailable from '../hooks/available';
import useAllPosts from '../hooks/allposts';
import Layout from '../components/layout';
import PostCard from "../components/postCard";
import Hero from "../components/hero";
import zaaiTrays from '../images/zaaitrays.jpg';
import notAvailable from '../images/notAvailable.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'gatsby';

const Verkrijgbaar = () => {
    const { available } = useAvailable();
    const { allposts } = useAllPosts();

    const shuffledPosts = shuffle(allposts).slice(0, 3);

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
                            <p>Ben je op de hoogte van het zaaischema en zie je er een plant tussen staan die je heel graag wilt hebben? Stuur dan een persoonlijk bericht.</p>
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
                        <div className="post-items">
                            {available.edges.map((edge, key) => {
                                const post = edge.node;
                                return (
                                    <div className="post-item post-item--static" key={key}>
                                        <div className="post-item__img">
                                            <img src={post.availableimage.url} alt={post.availableimage.title}/>
                                        </div>
                                        <div className="post-item__content">
                                            <span>{post.amount}</span>
                                            <h2>{post.title}</h2>
                                            <p>{post.date}</p>
                                        </div>                      
                                    </div>                                   
                                )
                            })}
                        </div>
                    )}
                </section>
                <section>
                    <div className='more-posts more-posts--bottom'>
                        <h3>Bekijk posts over onze tuin</h3>
                        <div className='more-posts__container'>
                            <div className='post-items'>
                            {shuffledPosts.map((edge, key) => {
                                const post = edge.node;
                                return <PostCard 
                                            key={key}
                                            slug={post.slug}
                                            img={post.featuredimage.url} 
                                            alt={post.featuredimage.title} 
                                            title={post.title} 
                                            description={post.description.description}
                                            recommend={true}
                                            publishedDate={post.publishedDate}
                                        />;
                            })}
                            </div>
                        </div>
                    </div> 
                </section>       
            </main>
        </Layout>
    )
}

export default Verkrijgbaar
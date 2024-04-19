import React from 'react';
import TipCard from '../components/tipCard'

const Tips = ({ tipArray }) => {
    return (
        <section>
            <h2 className='title-line' style={{display: "block"}}>
                <span>Moestuin tips</span>
            </h2>
            <div className='tip-items'>
                {tipArray.map((edge, key) => {
                    const tip = edge.node;
                    return (
                        <TipCard 
                            key={key}
                            slug={tip.slug}
                            img={tip.featuredimage.url} 
                            alt={tip.featuredimage.title} 
                            title={tip.title}
                        />
                    )
                })}
            </div>
        </section>
    )
}

export default Tips
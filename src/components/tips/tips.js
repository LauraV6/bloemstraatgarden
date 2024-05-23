import React from 'react';
import TipCard from './tipCard'
import useAllTips from '../../hooks/tips';

const Tips = () => {
    const { tips } = useAllTips();
    return (
        <section>
            <h2 className='title-line' style={{display: "block"}}>
                <span>Moestuin tips</span>
            </h2>
            <div className='tip-items'>
                {tips.map((edge, key) => {
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
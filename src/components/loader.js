import React from 'react';
import FadeIn from './animation/fadeIn';

const Loader = () => {
    return (
        <FadeIn className='load-container'>
            <div>
                <p>Blog aan het groeien...</p>
                <div className='load-flower-container'>
                    <span className="load-flower"></span>
                    <span className="load-flower"></span>
                    <span className="load-flower"></span>
                </div>
            </div>
        </FadeIn>
    )
}

export default Loader
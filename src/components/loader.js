import React from 'react';

const Loader = () => {
    return (
        <div className='load-container'>
            <div>
                <p>Blog aan het groeien...</p>
                <div className='load-flower-container'>
                    <span className="load-flower"></span>
                    <span className="load-flower"></span>
                    <span className="load-flower"></span>
                </div>
            </div>
        </div>
    )
}

export default Loader
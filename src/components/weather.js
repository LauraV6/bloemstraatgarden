import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun, faCloudSun, faCloud } from '@fortawesome/free-solid-svg-icons'

const Weather = ({weatherType}) => {
    return (
        <>
            {(() => {
                if(weatherType) {
                    return (
                        <div className="meta">
                            <div>
                                {(() => {
                                    const weatherText = weatherType.toString();
                                    switch (weatherText) {
                                    case ['veel zon']:
                                        return <FontAwesomeIcon icon={faSun} />;
                                    case 'halfschaduw':
                                        return <FontAwesomeIcon icon={faCloudSun} />;
                                    case 'schaduw':
                                        return <FontAwesomeIcon icon={faCloud} />;                                   
                                    default:
                                        return <FontAwesomeIcon icon={faSun} />;
                                    }
                                })()}
                                <span>{weatherType}</span>
                            </div>
                        </div>
                    )                 
                }
            })()}
        </>
    )
}

export default Weather
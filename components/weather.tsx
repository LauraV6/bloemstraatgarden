import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun, faCloudSun, faCloud } from '@fortawesome/free-solid-svg-icons'
import styles from "./weather.module.scss";

const Weather = ({weatherType} : {weatherType: string}) => {
    return (
        <>
            {(() => {
                if(weatherType) {
                    return (
                        <div className={styles.meta}>
                            <div>
                                {(() => {
                                    const weatherText = weatherType.toString();
                                    switch (weatherText) {
                                    case 'veel zon':
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
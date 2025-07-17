import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faCloudSun, faCloud } from '@fortawesome/free-solid-svg-icons';
import styles from "./weather.module.scss";

// Types
interface WeatherProps {
  weatherType: string;
  className?: string;
}

const Weather: React.FC<WeatherProps> = ({ weatherType, className }) => {
  // Don't render if no weather type provided
  if (!weatherType) {
    return null;
  }

  const getWeatherIcon = () => {
    const weatherText = weatherType.toString();
    switch (weatherText) {
      case 'veel zon':
        return faSun;
      case 'halfschaduw':
        return faCloudSun;
      case 'schaduw':
        return faCloud;
      default:
        return faSun;
    }
  };

  const containerClass = [styles.meta, className].filter(Boolean).join(' ');

  return (
    <div className={containerClass}>
      <div>
        <FontAwesomeIcon icon={getWeatherIcon()} />
        <span>{weatherType}</span>
      </div>
    </div>
  );
};

export default Weather;
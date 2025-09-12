'use client';

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faCloudSun, faCloud } from '@fortawesome/free-solid-svg-icons';
import { WeatherContainer, WeatherContent } from './Weather.styled';

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

  return (
    <WeatherContainer className={className}>
      <WeatherContent>
        <FontAwesomeIcon icon={getWeatherIcon()} />
        <span>{weatherType}</span>
      </WeatherContent>
    </WeatherContainer>
  );
};

export default Weather;
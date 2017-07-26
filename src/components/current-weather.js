import React, { Component } from 'react';
import PropTypes from 'prop-types';
import WindIcon from '../assets/wind-icon';
import './current-weather.css';

export default class CurrentWeather extends Component {
  static propTypes = {
    city: PropTypes.string.isRequired,
    temp: PropTypes.number.isRequired,
    humidity: PropTypes.number.isRequired,
    tempMin: PropTypes.number.isRequired,
    tempMax: PropTypes.number.isRequired,
    clouds: PropTypes.number.isRequired,
    country: PropTypes.string.isRequired,
    wind: PropTypes.object.isRequired,
    conditions: PropTypes.arrayOf(PropTypes.object).isRequired
  }

  render() {
    const { city, temp, conditions, humidity, pressure, tempMin, tempMax, clouds, country, wind } = this.props;

    return (
      <div className="current-weather">
        <div className="cw-city">
          {city}, {country}
        </div>
        <div className="cw-temp" >
          {Math.round(temp)}°C
        </div>
        {conditions.map(cond => <div key={cond.id} className="cw-condition">{cond.description}</div>)}
        <div className="cw-other">
          <div>Humidity: {humidity}%</div>
          <div>Pressure: {pressure} hpa</div>
          <div>Min: {tempMin}°C</div>
          <div>Clouds: {clouds}%</div>
          <div className="other-wind" >
            Wind: {wind.speed} m/s <WindIcon deg={wind.deg}/>
          </div>
          <div>Max: {tempMax}°C</div>
        </div>
      </div>
    );
  }
}
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import './forecast-item.css';

export default class ForecastItem extends Component {
  static propTypes = {
    forecast: PropTypes.object.isRequired,
  }

  render() {
    const { forecast } = this.props;
    const formatedDate = moment(forecast.dt * 1000).format('dd Do');
    const condition = forecast.weather[0];
    const tempArr = Object.keys(forecast.temp).map(key => forecast.temp[key]).reduce((sum, item) =>  [...sum, item]);
    const minTemp = Math.round(Math.min(...tempArr));
    const maxTemp = Math.round(Math.max(...tempArr));

    return (
      <div className="forecast-item">
        <div className="fi-date">{formatedDate}</div>
        <img alt="" src={`http://openweathermap.org/img/w/${condition.icon}.png`}/>
        <div className="fi-temp">
          <div className="fi-temp-max">{maxTemp}°C</div>
          <div className="fi-temp-min">{minTemp}°C</div>
        </div>
        <div className="fi-condition">{condition.description}</div>
      </div>
    );
  }
}
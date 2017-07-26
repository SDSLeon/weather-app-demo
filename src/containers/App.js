import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { CurrentWeather, ForecastItem } from '../components';
import { fetchWeather, fetchForecast, fetchIpLocation, setGspLocation } from '../actions';
import Scrollbar from 'react-perfect-scrollbar';
import '../assets/css/styles.css';
import './App.css';

class App extends Component {
  static propTypes = {
    fetchIpLocation: PropTypes.func,
    fetchWeather: PropTypes.func,
    setGspLocation: PropTypes.func,
    gpsLocation: PropTypes.object,
    fetchForecast: PropTypes.func,
    ipLocation: PropTypes.object,
    weatherData: PropTypes.object
  }

  componentWillMount() {
    this.props.fetchIpLocation(this.props.ipLocation);
    setTimeout(this.getGpsLocation, 100);
    setInterval(this.getGpsLocation, 60000)
  }

  componentWillReceiveProps(nextProps) {
    const { status } = this.props.weatherData;
    const { city } = this.props.ipLocation;
    const nextCity = nextProps.ipLocation.city;
    const { gpsLocation } = this.props;

    if (nextProps.gpsLocation.status === 'ok' && gpsLocation.timestamp !== nextProps.gpsLocation.timestamp) {
      this.props.fetchWeather(nextProps.gpsLocation);
      this.props.fetchForecast(nextProps.gpsLocation);

      return;
    }

    if (nextCity && city !== nextCity && status === 'initial') {
      this.props.fetchWeather(nextProps.ipLocation);
      this.props.fetchForecast(nextProps.ipLocation);
    }
  }

  getGpsLocation = () => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition((data) => {
      this.props.setGspLocation({
        latitude: data.coords.latitude,
        longitude: data.coords.longitude,
        timestamp: data.timestamp,
      });
    });
  }

  render() {
    if (!this.props.weatherData.main) return <div/>;

    const { forecastList } = this.props;
    const { name, weather, main, clouds, sys, wind } = this.props.weatherData;

    return (
      <div className="app">
        <div className={`background background-${weather[0].main}`} />
        <CurrentWeather
          temp={main.temp}
          conditions={weather}
          city={name}
          country={sys.country}
          humidity={main.humidity}
          pressure={main.pressure}
          tempMin={main.tempMin}
          tempMax={main.tempMax}
          clouds={clouds.all}
          wind={wind}
        />
        <div className="title">By day</div>
          <Scrollbar className="fl-scrollbar">
            <div className="forecast-list">
              {forecastList && forecastList.map(forecast => (
                <ForecastItem key={forecast.dt} forecast={forecast}/>
              ))}
          </div>
          </Scrollbar>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  ipLocation: state.ipLocation,
  forecastList: state.forecastData.list,
  weatherData: state.weatherData,
  gpsLocation: state.gpsLocation
})

export default connect(mapStateToProps, {
  push,
  fetchIpLocation,
  fetchWeather,
  fetchForecast,
  setGspLocation,
})(App)

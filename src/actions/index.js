import { CALL_API } from '../middleware/api'

const coreUrl = 'http://api.openweathermap.org/data/2.5';
const appId = 'fc99fdc7230e1d15511852a473f65e55';
const getLocationString = (lat, long) => `lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(long)}`

export const WEATHER_REQUEST = 'WEATHER_REQUEST'
export const WEATHER_SUCCESS = 'WEATHER_SUCCESS'
export const WEATHER_FAILURE = 'WEATHER_FAILURE'

export const fetchWeather = (location, type = 'ip') => {
  let latitude;
  let longitude;

  if (type === 'ip') {
    latitude = location.latitude;
    longitude = location.longitude;
  };

  return {
    [CALL_API]: {
      types: [ WEATHER_REQUEST, WEATHER_SUCCESS, WEATHER_FAILURE ],
      endpoint: `${coreUrl}/weather?${getLocationString(latitude, longitude)}&units=metric&appid=${appId}`,
    }
  };
};

export const FORECAST_REQUEST = 'FORECAST_REQUEST'
export const FORECAST_SUCCESS = 'FORECAST_SUCCESS'
export const FORECAST_FAILURE = 'FORECAST_FAILURE'

export const fetchForecast = (location, type = 'ip') => {
  let latitude;
  let longitude;

  if (type === 'ip') {
    latitude = location.latitude;
    longitude = location.longitude;
  };

  return {
    [CALL_API]: {
      types: [ FORECAST_REQUEST, FORECAST_SUCCESS, FORECAST_FAILURE ],
      endpoint: `${coreUrl}/forecast/daily?${getLocationString(latitude, longitude)}&units=metric&appid=${appId}&cnt=17`,
    }
  };
};

export const IP_LOCATION_REQUEST = 'IP_LOCATION_REQUEST'
export const IP_LOCATION_SUCCESS = 'IP_LOCATION_SUCCESS'
export const IP_LOCATION_FAILURE = 'IP_LOCATION_FAILURE'

export const fetchIpLocation = () => {
  return {
    [CALL_API]: {
      types: [ IP_LOCATION_REQUEST, IP_LOCATION_SUCCESS, IP_LOCATION_FAILURE ],
      endpoint: 'https://freegeoip.net/json/'
    }
  };
}

export const GPS_LOCATION_SET = 'GPS_LOCATION_SET'

export const setGspLocation = (location) => {
  console.log(location)

  return {
    type: GPS_LOCATION_SET,
    location
  };
}

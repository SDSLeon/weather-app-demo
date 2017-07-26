import { routerReducer } from 'react-router-redux'
import { combineReducers } from 'redux'
import {
  IP_LOCATION_REQUEST,
  IP_LOCATION_SUCCESS,
  IP_LOCATION_FAILURE,
  WEATHER_REQUEST,
  WEATHER_SUCCESS,
  WEATHER_FAILURE,
  FORECAST_REQUEST,
  FORECAST_SUCCESS,
  FORECAST_FAILURE,
  GPS_LOCATION_SET,
} from '../actions'


const ipLocation = (state, action) => {
  switch (action.type) {
  case IP_LOCATION_REQUEST:
    return { ...state, status: 'pending' }
  case IP_LOCATION_SUCCESS:
    return { ...state, ...action.response, status: 'ok' }
  case IP_LOCATION_FAILURE:
    return { ...state, status: 'failed' }
  default:
    return state || { status: 'initial', }
  }
}

const gpsLocation = (state, action) => {
  switch (action.type) {
  case GPS_LOCATION_SET:
    return { ...state, ...action.location, status: 'ok' }
  default:
    return state || { status: 'initial' }
  }
}

const weatherData = (state, action) => {
  switch (action.type) {
  case WEATHER_REQUEST:
    return { ...state, status: 'pending' }
  case WEATHER_SUCCESS:
    return { ...state, ...action.response, status: 'ok' }
  case WEATHER_FAILURE:
    return { ...state, status: 'failed' }
  default:
    return state || { status: 'initial' }
  }
}

const forecastData = (state, action) => {
  switch (action.type) {
  case FORECAST_REQUEST:
    return { ...state, status: 'pending' }
  case FORECAST_SUCCESS:
    return { ...state, ...action.response, status: 'ok' }
  case FORECAST_FAILURE:
    return { ...state, status: 'failed' }
  default:
    return state || { status: 'initial' }
  }
}


const rootReducer = combineReducers({
  router: routerReducer,
  weatherData,
  forecastData,
  ipLocation,
  gpsLocation,
})

export default rootReducer

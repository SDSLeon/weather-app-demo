import React from 'react'
import { render } from 'react-dom'
import Root from './containers/Root'
import { configureStore, history } from './store/configureStore'
import registerServiceWorker from './registerServiceWorker';

const store = configureStore()

render(
  <Root store={store} history={history} />,
  document.getElementById('root')
)

registerServiceWorker();

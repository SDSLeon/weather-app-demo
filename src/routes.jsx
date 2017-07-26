import React from 'react'
import { Route } from 'react-router-dom'
import { ConnectedRouter } from 'react-router-redux'
import App from './containers/App'

const Routes = ({ history }) => {
  return (
    <ConnectedRouter history={history}>
      <div>
        <Route path="/:city?" component={App} exact />
      </div>
    </ConnectedRouter>
  );
}

export default Routes;
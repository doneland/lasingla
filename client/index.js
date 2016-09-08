/**
 * Client entry point
 */
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import { match, Router, browserHistory } from 'react-router';
import { configureStore } from './store';

import Root from './Root';

// Routes of client application.
import routes from './routes';


// Initialize store
const store = configureStore(window.__INITIAL_STATE__);
const mountApp = document.getElementById('root');


// Use match to avoid differend rendering on server and client. This is
// required, because dynamic routing is used.
match({
  history: browserHistory,
  routes
}, (err, redirectLocation, renderProps) => {
  if (err) {
    console.log('Match error:', error);
  }

  /*render(
    <Provider store={store}>
      <Router history={browserHistory} {...renderProps}>
        {routes}
      </Router>
    </Provider>,
    mountApp
  );*/

  render(
    <AppContainer>
      <Root store={store} renderProps={renderProps} />
    </AppContainer>,
    mountApp
  );

  // For hot reloading of react components
  if (module.hot) {
    console.log('Do Hot reloading.');
    module.hot.accept('./Root', () => {
      // If you use Webpack 2 in ES modules mode, you can
      // use <App /> here rather than require() a <NextApp />.
      const NextRoot = require('./Root').default; // eslint-disable-line global-require
      render(
        <AppContainer>
          <NextRoot store={store} renderProps={renderProps} />
        </AppContainer>,
        mountApp
      );
    });
  }

});

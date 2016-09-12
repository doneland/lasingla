import Express from 'express';
import compression from 'compression';
import bodyParser from 'body-parser';
import path from 'path';
import cors from 'cors';

// Dependencies required by React
import {Provider} from 'react-redux';
import Helmet from 'react-helmet';
import React from 'react';
import {renderToString} from 'react-dom/server';
import {match, RouterContext} from 'react-router';

// Webpack requirements.
import webpack from 'webpack';
import config from '../webpack.config.dev';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

// React and Redux setup.
import {configureStore} from '../client/store';

// Import required modules.
import routes from '../client/routes';
import {fetchComponentData} from './util/fetchData';


const app = Express();

// Run Webpack dev server in development mode.
if (process.env.NODE_ENV === 'development') {
  const compiler = webpack(config);
  app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
    noInfo: true,
    reload: true
  }));
  app.use(webpackHotMiddleware(compiler));
}


// Apply body Parser and server public assets and routes.
app.use(cors());
app.use(compression());
app.use(bodyParser.json({limit: '20mb'}));
app.use(bodyParser.urlencoded({limit: '20mb', extended: false}));
app.use(Express.static(path.resolve(__dirname, '../dist')));

// Put here API routers.
//app.use('/api', posts);


// Render initial HTML.
const renderFullPage = (html, initialState) => {
  const head = Helmet.rewind();

  // Import Manifests for production app only.
  const assetsManifest = process.env.webpackAssets && JSON.parse(process.env.webpackAssets);
  const assetsChunkManifest = process.env.webpackChunkAssets && JSON.parse(process.env.webpackChunkAssets);

  return `
    <!doctype html>
    <html>
      <head>
        ${head.base.toString()}
        ${head.title.toString()}
        ${head.meta.toString()}
        ${head.link.toString()}
        ${head.script.toString()}

        ${process.env.NODE_ENV === 'production' ? `<link rel='stylesheet' href='${assetsManifest['/app.css']}' />` : ''}
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
          ${process.env.NODE_ENV === 'production' ?
          `//<![CDATA[
          window.webpackManifest = ${JSON.stringify(chunkManifest)};
          //]]>` : ''}
        </script>
        <script src='${process.env.NODE_ENV === 'production' ? assetsManifest['vendor.js'] : '/build/vendor.js'}'></script>
        <script src='${process.env.NODE_ENV === 'production' ? assetsManifest['app.js'] : '/build/app.js'}'></script>
      </body>
    </html>
  `;
};


const renderError = err => {
  const softTab = '&#32;&#32;&#32;&#32;';
  const errTrace = process.env.NODE_ENV !== 'production' ?
    `:<br><br><pre style="color:red">${softTab}${err.stack.replace(/\n/g, `<br>${softTab}`)}</pre>` : '';
  return renderFullPage(`Server Error${errTrace}`, {});
}


// Server side rendering based on routes matched by React router.
app.use((req, res, next) => {
  match({routes, location: req.url}, (err, redirectLocation, renderProps) => {
    if (err) {
      return res.status(500).end(renderError(err));
    }

    if (redirectLocation) {
      const {pathname, search} = redirectLocation;
      return res.redirect(302, pathname + search);
    }

    if (!renderProps) {
      return next();
    }

    const store = configureStore();
    const {components, params} = renderProps;

    return fetchComponentData(store, components, params)
      .then(() => {
        const initialView = renderToString(
          <Provider store={store} >
            <RouterContext {...renderProps} />
          </Provider>
        );
        const finalState = store.getState();

        res
          .set('Content-Type', 'text/html')
          .status(200)
          .end(renderFullPage(initialView, finalState));
      })
      .catch(err => {
        next(err);
      })
  });
});


// Start server.
// TODO: Create configuration file and provide info from it.
const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  console.log('Server listening on', PORT);
});


export default app;

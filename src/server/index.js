const express = require('express');
const proxy = require('express-http-proxy');
const compression = require('compression');
import { render } from './utils';
import { matchRoutes } from 'react-router-config';
import routes from '../Routes';

import { getServerStore } from '../store';

const app = express();

app.use(compression());
app.use(express.static('public'));

app.use(
  '/todos',
  proxy('https://jsonplaceholder.typicode.com', {
    proxyReqPathResolver: function(req) {
      return '/todos' + req.url;
    },
  }),
);

app.get('*', (req, res) => {
  const store = getServerStore();

  const promises = [];

  const matchedRoutes = matchRoutes(routes, req.path);

  matchedRoutes.forEach(item => {
    if (item.route.loadData) {
      const promise = new Promise((resolve, reject) => {
        item.route
          .loadData(store)
          .then(resolve)
          .catch(resolve);
      });
      promises.push(promise);
    }
  });

  Promise.all(promises)
    .then(() => {
      const context = { css: [] };
      const html = render(req, store, routes, context);
      if (context.NOT_FOUND) {
        res.status(404);
        res.send(html);
      } else if (context.action === 'REPLACE') {
        res.redirect(301, context.url);
      } else {
        res.send(html);
      }
    })
    .catch(err => console.log('server error'));
});

app.listen(3000, () => console.log('server running on port 3000'));

import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { renderRoutes } from "react-router-config";

export const render = (req, store, routes, context) => {
  const content = renderToString(
    <Provider store={store}>
      <Router location={req.url} context={context}>
        {renderRoutes(routes)}
      </Router>
    </Provider>
  );

  const cssStr = context.css.length ? context.css.join("\n") : "";
  return `
      <html>
        <head></head>
        <body>
        <style>${cssStr}</style>
          <div id='root'>${content}</div>
          <script>
            window.context = {
              state: ${JSON.stringify(store.getState())}
            }
          </script>
          <script src='index.js'></script>
        </body>
      </html>
    `;
};

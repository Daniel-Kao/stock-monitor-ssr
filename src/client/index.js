import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import { Provider } from "react-redux";
import routes from "../Routes";
import { getClientStore } from "../store";

const App = () => {
  return (
    <Provider store={getClientStore()}>
      <Router>{renderRoutes(routes)}</Router>
    </Provider>
  );
};

ReactDOM.hydrate(<App />, document.getElementById("root"));

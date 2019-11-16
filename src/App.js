import React from "react";
import { renderRoutes } from "react-router-config";
import Header from "./components/Header";

const Login = props => {
  return (
    <div>
      <Header />
      {renderRoutes(props.route.routes)}
    </div>
  );
};

export default Login;

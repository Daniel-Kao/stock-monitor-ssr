import React from 'react';
import { renderRoutes } from 'react-router-config';
import Header from './components/Header';
import './global.css';

const Login = props => {
  return (
    <div>
      <Header />
      {renderRoutes(props.route.routes)}
    </div>
  );
};

export default Login;

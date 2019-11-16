import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import serverAxios from '../server/request';
import clientAxios from '../client/request';
import { reducer as homeReducer } from '../pages/Home/store';

const reducer = combineReducers({
  home: homeReducer,
});

const getClientStore = () => {
  const defaultState = window.context.state;
  return createStore(reducer, defaultState, applyMiddleware(thunk.withExtraArgument(clientAxios)));
};

const getServerStore = () => {
  return createStore(reducer, applyMiddleware(thunk.withExtraArgument(serverAxios)));
};

export { getClientStore, getServerStore };

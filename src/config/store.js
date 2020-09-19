import { createStore, compose } from 'redux';

import Middlewares from './middlewares';

import Reducers from './reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let configureStore = (initialState = {})=> {
  return composeEnhancers(Middlewares())(createStore)(Reducers(), initialState );
};

export default configureStore;

/* eslint-disable no-underscore-dangle */
// eslint-disable-next-line import/no-extraneous-dependencies
import { History } from 'history';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';
import { combineReducers, createStore, compose, applyMiddleware } from 'redux';
import env from '../env';
import { StoreStates, reducers } from './store';

const configureStore = (history: History, initialState?: StoreStates) => {
  const middlewares = [thunk, routerMiddleware(history)];

  const enhancers = [];
  if (
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
    env.current === 'development'
  ) {
    enhancers.push((window as any).__REDUX_DEVTOOLS_EXTENSION__());
  }

  return createStore(
    combineReducers({
      ...reducers,
      router: connectRouter(history),
    }),
    initialState,
    compose(applyMiddleware(...middlewares), ...enhancers)
  );
};

export default configureStore;

import { createStore, applyMiddleware, compose } from 'redux';
import reduxApp from '../reducers';
import thunk from 'redux-thunk';

/* eslint-disable no-underscore-dangle */

export const composeEnhancers =
  (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const store = createStore(reduxApp, /* preloadedState, */ composeEnhancers(applyMiddleware(thunk)));
/* eslint-enable */

export default store;

import { createStore, applyMiddleware, compose } from 'redux';
import zpoApp from 'reducers';
import thunk from 'redux-thunk';

/* eslint-disable no-underscore-dangle */

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(zpoApp, /* preloadedState, */ composeEnhancers(applyMiddleware(thunk)));
/* eslint-enable */

export default store;

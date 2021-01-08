import { createStore, compose } from 'redux';
import rootReducer from '../reducers';

const composeEnhancers = window
  .__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    trace: true,
    traceLimit: 25,
  })
  || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(),
);

export default store;

// const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

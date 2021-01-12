import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

const composeView = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

function storeConfig() {
  return createStore(
    rootReducer,
    composeView(applyMiddleware(thunk)),
  );
}

export default storeConfig;

import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/index';

export default createStore(rootReducer,
  compose(
    applyMiddleware(thunk),
  ));

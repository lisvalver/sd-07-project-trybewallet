// importe o método applyMiddleware
import { createStore, applyMiddleware } from 'redux';
// importe o redux-thunk
import thunk from 'redux-thunk';
import reducers from '../reducers';

// aplique o middleware
const store = createStore(
  reducers,
  applyMiddleware(thunk),
);

export default store;

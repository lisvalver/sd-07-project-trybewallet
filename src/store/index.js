import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { globalReducer } from '../reducers';

export const store = createStore(
  globalReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);

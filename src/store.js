import { createStore, combineReducers } from 'redux';
import { userReducer, walletReducer } from './reducers';

const rootReducer = combineReducers({ userReducer, walletReducer });
const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

export default store;

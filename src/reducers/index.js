import { combineReducers } from 'redux';
import user from './user';
import wallet from './wallet';

const rootReducer = {
  user,
  wallet,
};

export default combineReducers(rootReducer);

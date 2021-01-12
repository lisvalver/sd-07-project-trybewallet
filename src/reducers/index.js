import { combineReducers } from 'redux';
import user from './user';
import wallet from './wallet';

const globalReducer = combineReducers({
  user,
  wallet,
});

export default globalReducer;

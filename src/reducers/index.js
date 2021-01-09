import { combineReducers } from 'redux';
import user from './user';
import wallet from './wallet';
import economyApi from './economyApi';

const reducerAll = combineReducers({
  user,
  wallet,
  economyApi,
});

export default reducerAll;

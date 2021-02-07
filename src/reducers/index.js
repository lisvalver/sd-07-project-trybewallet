import user from './user';
import wallet from './wallet';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  user: user,
  wallet: wallet,
});

export default rootReducer

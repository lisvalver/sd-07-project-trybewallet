import { combineReducers } from 'redux';
import userReducer from './user';
import walletReducer from './walletReducer';

const rootReducers = combineReducers({
  user: userReducer,
  wallet: walletReducer,
});

export default rootReducers;

import { combineReducers } from 'redux';
import user from './user';
import wallet from './wallet';
import validation from './validation';

const rootReducer = combineReducers({
  user,
  wallet,
  validation,
});

export default rootReducer;

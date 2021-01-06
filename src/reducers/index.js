import user from './user';
import wallet from './wallet';
import { combineReducers } from 'redux';

const reducer = combineReducers({ user, wallet });

export default reducer;

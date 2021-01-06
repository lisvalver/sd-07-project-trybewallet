import user from './user';
import wallet from './wallet';
import { combineReducers } from 'redux';

const reducerAll = combineReducers({user, wallet});

export default reducerAll;

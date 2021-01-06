import { combineReducers } from 'redux';
import user from './user';
import wallet from './wallet';


const reducerAll = combineReducers({ user, wallet });

export default reducerAll;

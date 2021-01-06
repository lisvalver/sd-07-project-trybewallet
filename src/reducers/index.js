import { combineReducers } from 'redux';
import user from './user';
// import wallet from './wallet';
const rootReducers = combineReducers({ user });
// Configure os seus reducers.
export default rootReducers;
// ATENÇÃO: você obrigatoriamente tem que utilizar as chaves "user" e "wallet" no seu estado global

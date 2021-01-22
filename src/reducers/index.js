import { combineReducers } from 'redux';
import user from './user';
// import wallet from './wallet';

const rootReducer = combineReducers({
  user,
  // reducer 2
});

export default rootReducer;
// Configure os seus reducers.
// ATENÇÃO: você obrigatoriamente tem que utilizar as chaves "user" e "wallet" no seu estado global

import { combineReducers } from 'redux';
import userReducer from './user';
import walletReducer from './wallet';

// Configure os seus reducers.
// ATENÇÃO: você obrigatoriamente tem que utilizar as chaves "user" e "wallet" no seu estado global
const reducers = combineReducers({ user: userReducer, wallet: walletReducer });

export default reducers;

// import { combineReducers } from 'redux';
// import user from './user';
// import wallet from './wallet';

// // Configure os seus reducers.
// // ATENÇÃO: você obrigatoriamente tem que utilizar as chaves "user" e "wallet" no seu estado global
// const rootReducer = combineReducers({ user, wallet });

// export default rootReducer;

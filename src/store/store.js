import { createStore, combineReducers } from 'redux';
import { User, Wallet } from '../reducers';

const rootReducer = combineReducers({
  user: User,
  wallet: Wallet,
});

const store = createStore(rootReducer);

export default store;

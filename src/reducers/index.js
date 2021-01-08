import { combineReducers } from 'redux';

import userReducer from '../store/ducks/user';
import walletReducer from '../store/ducks/wallet';

const rootReducer = combineReducers({ userReducer, walletReducer });

export default rootReducer;

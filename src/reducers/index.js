import { combineReducers } from 'redux';

import user from '../store/ducks/user';
import wallet from '../store/ducks/wallet';

const rootReducer = combineReducers({ user, wallet });

export default rootReducer;

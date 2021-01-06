import { createStore, combineReducers } from 'redux';

import *NomeDoReducer* from '../reducers';

const rootReducer = combineReducers({ *NomeDoReducer* });

const store = createStore(*NomeDoReducer*);

export default store;

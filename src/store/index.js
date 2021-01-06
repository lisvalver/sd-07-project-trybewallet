import { createStore } from 'redux';
import rootReducer from '../reducers';

const initialState = {
  user: {
    email: '',
  },
  wallet: {
    currencies: [],
    expenses: [],
  },
};

const store = createStore(rootReducer, initialState);

export default store;

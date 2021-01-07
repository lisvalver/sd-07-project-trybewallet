import { ADD_EXPENSE } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_EXPENSE:
    return { ...state };
  default:
    return state;
  }
};

export default walletReducer;

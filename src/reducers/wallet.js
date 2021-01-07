import { ADD_EXPENSE, TOTAL_EXPENSE } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  totalExpenses: 0,
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_EXPENSE:
    return { ...state };
  case TOTAL_EXPENSE:
    return { ...state, totalExpenses: action.payload };
  default:
    return state;
  }
};

export default walletReducer;

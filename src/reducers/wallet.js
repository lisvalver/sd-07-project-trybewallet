import { ADD_EXPENSE, REMOVE_EXPENSE } from '../actions';

const walletInitialState = {
  currencies: [],
  expenses: [],
};

function walletReducer(state = walletInitialState, action) {
  switch (action.type) {
  case ADD_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  case REMOVE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter(({ id }) => id !== action.payload )
    };
  default:
    return state;
  }
}

export default walletReducer;

import { ADD_EXPENSE } from '../actions';

const walletInitialState = {
  currencies: [],
  expenses: [],
};

function walletReducer(state = walletInitialState, action) {
  switch (action.type) {
  case ADD_EXPENSE: {
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  }
  default:
    return state;
  }
}

export default walletReducer;

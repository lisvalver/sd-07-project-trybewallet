import { ADD_EXPENSE, REMOVE_EXPENSE, ACTUALIZE_EXPENSE } from '../actions';

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
      expenses: state.expenses.filter(({ id }) => id !== action.payload),
    };
  case ACTUALIZE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.map((expense) => (
        (expense.id === action.payload.id) ? action.payload : expense)),
      /*
      The code above does the same than the bellow one:

      expenses: state.expenses.map((expense) => {
        if (expense.id === action.payload.id) {
          return action.payload;
        }
        return expense;
      }),
      */
    };
  default:
    return state;
  }
}

export default walletReducer;

import { GET_CURRENCIES, ADD_EXPENSE, DELETE_EXPENSE, EDIT_EXPENSE } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  total: 0,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_CURRENCIES:
    return { ...state, currencies: action.currencies };
  case ADD_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, action.expenses],
      total: state.total + action.total,
    };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter((expense) => expense.id !== +action.id),
    };
  case EDIT_EXPENSE:
    return { ...state,
      expenses: state.expenses
        .map((expense) => {
          if (action.expenses.id === expense.id) return action.expenses;
          return expense;
        }),
      total: state.total + action.total,
    };
  default:
    return state;
  }
};

export default wallet;

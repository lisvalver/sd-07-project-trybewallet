import { GET_CURRENCIES, ADD_EXPENSES, DEL_EXPENSES } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

export default function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case GET_CURRENCIES:
    return {
      ...state,
      currencies: action.getCurrencies,
    };
  case ADD_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, action.addExpenses],
    };
  case DEL_EXPENSES:
    return {
      ...state,
      expenses: state.expenses.filter((item) => item.id !== action.id), // Source: https://github.com/tryber/sd-07-project-trybewallet/pull/129/files
    };
  default:
    return state;
  }
}

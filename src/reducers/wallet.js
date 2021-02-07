import { GET_CURRENCIES, ADD_EXPENSES } from '../actions';

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
  default:
    return state;
  }
}

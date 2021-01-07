import { REQUEST_CURRENCIES, ADD_EXPENSE } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
  case REQUEST_CURRENCIES:
    return { ...state, currencies: (action.currencies).sort() };
  case ADD_EXPENSE:
    return { ...state, expenses: (action.expense) };
  default:
    return state;
  }
}

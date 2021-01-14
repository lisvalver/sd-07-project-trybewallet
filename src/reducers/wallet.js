import { RECIVE_CURRENCY, RECIVE_EXPENSE } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

function fetch(state = INITIAL_STATE, action) {
  switch (action.type) {
  case RECIVE_CURRENCY:
    return {
      ...state, currencies: action.currencies,
    };
  case RECIVE_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, action.expenses],
    };
  default:
    return state;
  }
}

export default fetch;

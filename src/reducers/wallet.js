import { ADD_EXPENSE, DEL_EXPENSE, ADD_CURRENCY } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  currenciesCode: [],
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ADD_EXPENSE:
    return { ...state, expenses: action.expense };
  case DEL_EXPENSE:
    return { ...state,
      expenses: state.expenses
        .filter((itemID) => itemID !== action.id) };
  case ADD_CURRENCY:
    return { ...state, currencies: action.currency };
  default:
    return state;
  }
}

export default wallet;

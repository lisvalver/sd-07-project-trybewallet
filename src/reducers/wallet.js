import {
  REQUEST_CURRENCIES,
  RECEIVE_CURRENCIES,
  FAILED_REQUEST,
  ADD_EXPENSE,
  TOTAL,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  expenseIndex: 0,
  isFetching: false,
  error: '',
  total: 0,
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case REQUEST_CURRENCIES:
    return { ...state, isFetching: true };
  case RECEIVE_CURRENCIES:
    return { ...state, currencies: action.currencies, isFetching: false };
  case FAILED_REQUEST:
    return { ...state, error: action.error, isFetching: false };
  case ADD_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, action.expense],
      expenseIndex: action.expense.id + 1,
    };
  case TOTAL: {
    let total = state.expenses
      .reduce(
        (acc, { value, exchangeRates, currency }) => (
          acc + parseFloat(value) * parseFloat(exchangeRates[currency].ask)
        ),
        0,
      );
    total = parseFloat(total.toFixed(2));
    return { ...state, total };
  }
  default:
    return state;
  }
}

export default wallet;

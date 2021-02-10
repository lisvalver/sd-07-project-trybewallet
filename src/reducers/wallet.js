import types from '../actions/types';

const WALLET_INITIAL_VALUE = {
  currencies: [],
  expenses: [],
  isFetching: false,
  error: '',
};

const wallet = (state = WALLET_INITIAL_VALUE, action) => {
  switch (action.type) {
  case types.CURRENCIES_REQUEST:
    return { ...state, isFetching: true };
  case types.CURRENCIES_REQUEST_FAILED:
    return { ...state, error: action.error, isFetching: false };
  case types.CURRENCIES_REQUEST_SUCCEED:
    return { ...state, currencies: action.currencies, isFetching: false };
  // case types.SEND_NEW_EXPENSE_DATA:
  //   return { ...state, isFetching: true };
  // case types.SEND_NEW_EXPENSE_DATA_FAILED:
  //   return { ...state, error: action.error, isFetching: false };
  // case types.SEND_NEW_EXPENSE_DATA_SUCCEED:
  //   return { ...state, expenses: action.expenses, isFetching: false };
  default:
    return state;
  }
};

export default wallet;

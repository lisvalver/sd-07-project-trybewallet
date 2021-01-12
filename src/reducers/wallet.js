import {
  ADD_EXPENSE,
  START_REQUEST,
  SUCCESS_REQUEST,
  REQUEST_EXCHANGES,
  FAIL_REQUEST,
} from '../actions/index';

const WALLET_INITIAL_STATE = {
  currencies: [],
  expenses: [],
  isFetching: false,
  expenseId: 0,
  rates: {},
  error: '',
};

const wallet = (state = WALLET_INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_EXPENSE:
    action.expense.id = state.expenseId;
    action.expense.exchangeRates = state.rates;
    return ({
      ...state,
      expenses: [...state.expenses, action.expense],
      expenseId: state.expenseId + 1,
    });
  case START_REQUEST:
    return {
      ...state,
      isFetching: true,
    };
  case SUCCESS_REQUEST:
    return {
      ...state,
      isFetching: false,
      currencies: action.currencies,
    };
  case REQUEST_EXCHANGES:
    return {
      ...state,
      rates: action.exchangeRates,
    };
  case FAIL_REQUEST:
    return {
      ...state,
      error: action.error,
      isFetching: false,
    };
  default:
    return state;
  }
};

export default wallet;

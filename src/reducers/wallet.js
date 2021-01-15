import {
  START_REQUEST,
  SUCCESS_REQUEST,
  REQUEST_EXCHANGES,
  FAIL_REQUEST,
  REMOVE_EXPENSE,
} from '../actions/index';

const WALLET_INITIAL_STATE = {
  currencies: [],
  expenses: [],
  isFetching: false,
  nextId: 0,
  error: '',
};

const wallet = (state = WALLET_INITIAL_STATE, action) => {
  switch (action.type) {
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
      expenses: [...state.expenses,
        { ...action.addExpense, id: state.nextId, exchangeRates: action.exchangeRates }],
      nextId: state.nextId + 1,
    };
  case FAIL_REQUEST:
    return {
      ...state,
      error: action.error,
      isFetching: false,
    };
  case REMOVE_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses.filter((exp) => exp.id !== action.id)],
    };
  default:
    return state;
  }
};

export default wallet;

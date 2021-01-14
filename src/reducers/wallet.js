import {
  RECEIVE_CURRENCY_EXCHANGE,
  RECEIVE_CURRENCIES,
  FAILED_REQUEST,
  ADD_EXPENSE,
  ALL_DATA,
} from '../actions/index';

const INITIAL_STATE = {
  expenses: [],
  currencies: [],
  error: '',
  controlId: 0,
  rates: {},
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  // feito com ajuda do Rafael Guimarães
  case ADD_EXPENSE:
    action.expense.id = state.controlId;
    action.expense.exchangeRates = state.rates;
    return {
      ...state,
      expenses: [...state.expenses, action.expense],
      controlId: state.controlId + 1,
    };
  case RECEIVE_CURRENCIES:
    return { ...state, currencies: action.currencies };
  case FAILED_REQUEST:
    return { ...state, error: action.payload };
  case ALL_DATA:
    return { ...state, rates: action.allDataObj };
  case RECEIVE_CURRENCY_EXCHANGE:
    return { ...state, rates: action.exchangeRates };
  default:
    return state;
  }
};

export default wallet;

import {
  REQUEST_CURRENCIES,
  RECEIVE_CURRENCIES_SUCCESS,
  RECEIVE_CURRENCIES_FAILURE, EXPENSES, EXPENSES_CURRENCY,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  expense: {
    id: 0,
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    exchangeRates: {},
  },
  isFetching: false,
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case REQUEST_CURRENCIES:
    return {
      ...state,
      isFetching: true,
    };
  case RECEIVE_CURRENCIES_SUCCESS:
    return {
      ...state,
      currencies: action.currencies,
      isFetching: false,
    };
  case RECEIVE_CURRENCIES_FAILURE:
    return {
      ...state,
      error: action.error,
      isFetching: false,
    };
  case EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, action.expenses],
    };
  case EXPENSES_CURRENCY:
    return {
      ...state,
      expense: { ...state.expense, ...action.expense },
    };
  default:
    return state;
  }
}

export default wallet;

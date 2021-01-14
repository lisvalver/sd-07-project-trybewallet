import {
  REQUEST_CURRENCIES,
  REQUEST_CURRENCIES_SUCCESS,
  REQUEST_CURRENCIES_FAIL,
  SAVE_EXPENSE,
} from '../actions';

const INITIAL_STATE = {
  isLoading: false,
  error: '',
  expenses: [],
  exchangeRates: {},
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case REQUEST_CURRENCIES:
    return { ...state, isLoading: true };
  case REQUEST_CURRENCIES_SUCCESS:
    return {
      ...state,
      isLoading: false,
      exchangeRates: action.payload,
    };
  case REQUEST_CURRENCIES_FAIL:
    return { ...state, isLoading: false, error: action.payload };
  case SAVE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.concat(action.payload),
    };
  default:
    return state;
  }
}

export default wallet;

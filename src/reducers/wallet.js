import {
  WALLET,
  GET_CURRENCY,
  REQUEST_CURRENCY,
  FAILED_REQUEST,
  SEND_OBJECT_EXPENSE,
} from '../actions';

const WALLETS = {
  currencies: [],
  expenses: [],
  apiExpenses: {},
  error: '',
};

function wallet(state = WALLETS, action) {
  switch (action.type) {
  case WALLET:
    return { ...state,
      currencies: action.payload.currencies,
      apiExpenses: action.payload.expenses };
  case REQUEST_CURRENCY:
    return { ...state, isFetching: true };
  case GET_CURRENCY:
    return { ...state, apiExpenses: action.payload, isFetce: false };
  case FAILED_REQUEST:
    return { ...state, error: action.payload };
  case SEND_OBJECT_EXPENSE:
    return { ...state, expenses: state.expenses.concat(action.payload) };
  default:
    return state;
  }
}

export default wallet;

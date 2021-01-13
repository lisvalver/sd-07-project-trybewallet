import { ADD_EXPENSES,
  REQUEST,
  SUCCESSFULLY_RECEIVED,
  EXCHANGE,
  SUCCESSFULLY_ERROR } from '../actions/wallet';

const INITIAL_STATE_WALLET = {
  currencies: [],
  expenses: [],
  isLoading: false,
  id: 0,
  exchange: {},
};

const wallet = (state = INITIAL_STATE_WALLET, action) => {
  switch (action.type) {
  case ADD_EXPENSES:
    action.expense.id = state.id;
    action.expense.exchangeRates = state.exchange;
    return { ...state, expenses: [...state.expenses, action.expense], id: state.id + 1 };
  case REQUEST:
    return { ...state, isLoading: true };
  case SUCCESSFULLY_RECEIVED:
    return { ...state, currencies: action.currencies, isLoading: false };
  case EXCHANGE:
    return { ...state, exchange: action.exchangeRates };
  case SUCCESSFULLY_ERROR:
    return { ...state, currencies: action.currencies, isLoading: false };
  default:
    return state;
  }
};

export default wallet;

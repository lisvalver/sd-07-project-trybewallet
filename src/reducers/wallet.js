// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { ADD_EXPENSES,
  FAILED_REQUEST,
  REQUEST,
  ADD_CURRENCY,
  ADD_TOTAL } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  error: '',
  loading: false,
  id: 0,
  currency: [],
  totalValue: 0,
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ADD_EXPENSES:
    action.expenses.id = state.id;
    return {
      ...state,
      expenses: [...state.expenses, action.expenses],
      id: state.id + 1,
      loading: false,
      totalValue: +(parseFloat(state.totalValue + action.expenses.value
        * action.expenses.exchangeRates[action.expenses.currency].ask).toFixed(2)),
    };
  case FAILED_REQUEST:
    return {
      ...state,
      error: action.error,
      loading: false,
    };
  case REQUEST:
    return {
      ...state,
      loading: true,
      error: '',
    };
  case ADD_CURRENCY:
    return { ...state, currency: action.currency, loading: false };
  case ADD_TOTAL:
    return { ...state, totalValue: action.value };
  default:
    return state;
  }
}

export default wallet;
